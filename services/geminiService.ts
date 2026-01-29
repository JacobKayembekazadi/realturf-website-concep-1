
import { aiChat, aiAnalyze, ChatMessage } from "./aiProvider";
import { allProducts, KNOWLEDGE_BASE_CONTEXT } from "../constants";

const SYSTEM_PROMPT = `You are RealTurf's premium AI concierge. Your tone is professional, helpful, and expert. Answer questions about products, installation, and tech like MaxDrain or SoftMax. Do not mention pricing. Knowledge base:\n${KNOWLEDGE_BASE_CONTEXT}`;

export const getChatResponse = async (
  history: { role: 'user' | 'model'; parts: { text: string }[] }[],
  newMessage: string
): Promise<string> => {
  // Convert Gemini-style history to generic format
  const chatHistory: ChatMessage[] = history.map(msg => ({
    role: msg.role === 'model' ? 'assistant' : 'user',
    content: msg.parts[0]?.text || ''
  }));

  return aiChat(SYSTEM_PROMPT, chatHistory, newMessage);
};

export const getQuoteAnalysis = async (
  projectDetails: any,
  image?: { mimeType: string; data: string }
): Promise<string> => {
  const prompt = `Analyze this turf installation project. Recommend 2-3 specific RealTurf products from this list: ${JSON.stringify(allProducts.map(p => p.name))}.
Details: ${JSON.stringify(projectDetails)}
Provide a detailed professional analysis and specific product match reasons. Respond ONLY in JSON with this structure: { "recommendations": [{ "productName": "string", "reason": "string" }], "analysis": "string" }`;

  const result = await aiAnalyze(prompt, image);
  return JSON.stringify(result);
};
