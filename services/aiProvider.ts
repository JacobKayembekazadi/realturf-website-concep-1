
import { GoogleGenAI, Type } from "@google/genai";

export type AIProvider = 'gemini' | 'openai' | 'anthropic';

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

export interface AIConfig {
  provider: AIProvider;
  apiKey: string;
  model?: string;
}

interface QuoteAnalysisResult {
  recommendations: { productName: string; reason: string }[];
  analysis: string;
}

const getConfig = (): AIConfig => {
  const provider = (process.env.AI_PROVIDER || 'gemini') as AIProvider;

  let apiKey = '';
  let model = '';

  switch (provider) {
    case 'openai':
      apiKey = process.env.OPENAI_API_KEY || '';
      model = process.env.OPENAI_MODEL || 'gpt-4o-mini';
      break;
    case 'anthropic':
      apiKey = process.env.ANTHROPIC_API_KEY || '';
      model = process.env.ANTHROPIC_MODEL || 'claude-3-haiku-20240307';
      break;
    case 'gemini':
    default:
      apiKey = process.env.GEMINI_API_KEY || '';
      model = process.env.GEMINI_MODEL || 'gemini-2.0-flash';
      break;
  }

  return { provider, apiKey, model };
};

const config = getConfig();

if (!config.apiKey) {
  console.warn(`Warning: API key for ${config.provider} is not configured. AI features will not work.`);
}

// Gemini implementation
const geminiChat = async (
  systemPrompt: string,
  history: ChatMessage[],
  message: string
): Promise<string> => {
  const ai = new GoogleGenAI({ apiKey: config.apiKey });

  const geminiHistory = history.map(msg => ({
    role: msg.role === 'assistant' ? 'model' as const : 'user' as const,
    parts: [{ text: msg.content }]
  }));

  const chat = ai.chats.create({
    model: config.model || 'gemini-2.0-flash',
    config: { systemInstruction: systemPrompt },
    history: geminiHistory
  });

  const result = await chat.sendMessage({ message });
  return result.text || '';
};

const geminiAnalyze = async (
  prompt: string,
  image?: { mimeType: string; data: string }
): Promise<QuoteAnalysisResult> => {
  const ai = new GoogleGenAI({ apiKey: config.apiKey });

  const contents: any[] = [{ text: prompt }];
  if (image) {
    contents.push({ inlineData: image });
  }

  const schema = {
    type: Type.OBJECT,
    properties: {
      recommendations: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            productName: { type: Type.STRING },
            reason: { type: Type.STRING },
          },
          required: ["productName", "reason"],
        },
      },
      analysis: { type: Type.STRING }
    },
    required: ["recommendations", "analysis"]
  };

  const response = await ai.models.generateContent({
    model: config.model || 'gemini-2.0-flash',
    contents: { parts: contents },
    config: {
      responseMimeType: "application/json",
      responseSchema: schema
    }
  });

  return JSON.parse(response.text || '{}');
};

// OpenAI implementation
const openaiChat = async (
  systemPrompt: string,
  history: ChatMessage[],
  message: string
): Promise<string> => {
  const messages = [
    { role: 'system', content: systemPrompt },
    ...history.map(msg => ({ role: msg.role, content: msg.content })),
    { role: 'user', content: message }
  ];

  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${config.apiKey}`
    },
    body: JSON.stringify({
      model: config.model || 'gpt-4o-mini',
      messages
    })
  });

  const data = await response.json();
  return data.choices?.[0]?.message?.content || '';
};

const openaiAnalyze = async (
  prompt: string,
  image?: { mimeType: string; data: string }
): Promise<QuoteAnalysisResult> => {
  const content: any[] = [{ type: 'text', text: prompt }];

  if (image) {
    content.push({
      type: 'image_url',
      image_url: { url: `data:${image.mimeType};base64,${image.data}` }
    });
  }

  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${config.apiKey}`
    },
    body: JSON.stringify({
      model: config.model || 'gpt-4o-mini',
      messages: [{ role: 'user', content }],
      response_format: { type: 'json_object' }
    })
  });

  const data = await response.json();
  return JSON.parse(data.choices?.[0]?.message?.content || '{}');
};

// Anthropic implementation
const anthropicChat = async (
  systemPrompt: string,
  history: ChatMessage[],
  message: string
): Promise<string> => {
  const messages = [
    ...history.map(msg => ({ role: msg.role, content: msg.content })),
    { role: 'user', content: message }
  ];

  const response = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': config.apiKey,
      'anthropic-version': '2023-06-01'
    },
    body: JSON.stringify({
      model: config.model || 'claude-3-haiku-20240307',
      max_tokens: 1024,
      system: systemPrompt,
      messages
    })
  });

  const data = await response.json();
  return data.content?.[0]?.text || '';
};

const anthropicAnalyze = async (
  prompt: string,
  image?: { mimeType: string; data: string }
): Promise<QuoteAnalysisResult> => {
  const content: any[] = [{ type: 'text', text: prompt }];

  if (image) {
    content.push({
      type: 'image',
      source: {
        type: 'base64',
        media_type: image.mimeType,
        data: image.data
      }
    });
  }

  const response = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': config.apiKey,
      'anthropic-version': '2023-06-01'
    },
    body: JSON.stringify({
      model: config.model || 'claude-3-haiku-20240307',
      max_tokens: 1024,
      messages: [{ role: 'user', content }]
    })
  });

  const data = await response.json();
  const text = data.content?.[0]?.text || '{}';

  // Extract JSON from response
  const jsonMatch = text.match(/\{[\s\S]*\}/);
  return JSON.parse(jsonMatch ? jsonMatch[0] : '{}');
};

// Unified API
export const aiChat = async (
  systemPrompt: string,
  history: ChatMessage[],
  message: string
): Promise<string> => {
  if (!config.apiKey) {
    return "AI features are currently unavailable. Please configure your API key.";
  }

  try {
    switch (config.provider) {
      case 'openai':
        return await openaiChat(systemPrompt, history, message);
      case 'anthropic':
        return await anthropicChat(systemPrompt, history, message);
      case 'gemini':
      default:
        return await geminiChat(systemPrompt, history, message);
    }
  } catch (error) {
    console.error(`${config.provider} Chat Error:`, error);
    return "I'm experiencing a temporary connection issue. Please try again in a moment.";
  }
};

export const aiAnalyze = async (
  prompt: string,
  image?: { mimeType: string; data: string }
): Promise<QuoteAnalysisResult> => {
  const fallback: QuoteAnalysisResult = {
    recommendations: [{ productName: "Absolute", reason: "Standard high-performance choice for most U.S. climates." }],
    analysis: "Automatic analysis failed, but our experts recommend Absolute for its versatility."
  };

  if (!config.apiKey) {
    return {
      recommendations: [{ productName: "Absolute", reason: "API key not configured. Default recommendation provided." }],
      analysis: "AI analysis is unavailable. Please configure your API key for full functionality."
    };
  }

  try {
    switch (config.provider) {
      case 'openai':
        return await openaiAnalyze(prompt, image);
      case 'anthropic':
        return await anthropicAnalyze(prompt, image);
      case 'gemini':
      default:
        return await geminiAnalyze(prompt, image);
    }
  } catch (error) {
    console.error(`${config.provider} Analysis Error:`, error);
    return fallback;
  }
};

export const getProviderInfo = () => ({
  provider: config.provider,
  model: config.model,
  isConfigured: !!config.apiKey
});
