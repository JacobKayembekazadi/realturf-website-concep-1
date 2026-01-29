
import { GoogleGenAI, GenerateContentResponse, Type } from "@google/genai";
import { allProducts, KNOWLEDGE_BASE_CONTEXT } from "../constants";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const getChatResponse = async (history: { role: 'user' | 'model'; parts: { text: string }[] }[], newMessage: string): Promise<string> => {
  const chat = ai.chats.create({
    model: 'gemini-3-flash-preview',
    config: {
      systemInstruction: `You are RealTurf's premium AI concierge. Your tone is professional, helpful, and expert. Answer questions about products, installation, and tech like MaxDrain or SoftMax. Do not mention pricing. Knowledge base:\n${KNOWLEDGE_BASE_CONTEXT}`
    },
    history
  });

  try {
    const result = await chat.sendMessage({ message: newMessage });
    return result.text || "I apologize, I'm having trouble processing that right now.";
  } catch (error) {
    console.error("Chat Error:", error);
    return "I'm experiencing a temporary connection issue. Please try again in a moment.";
  }
};

export const getQuoteAnalysis = async (projectDetails: any, image?: { mimeType: string; data: string }): Promise<string> => {
  const contents: any[] = [{
    text: `Analyze this turf installation project. Recommend 2-3 specific RealTurf products from this list: ${JSON.stringify(allProducts.map(p => p.name))}.
    Details: ${JSON.stringify(projectDetails)}
    Provide a detailed professional analysis and specific product match reasons. Respond ONLY in JSON.`
  }];

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
  
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: { parts: contents },
      config: {
        responseMimeType: "application/json",
        responseSchema: schema
      }
    });
    return response.text || "{}";
  } catch (error) {
    console.error("Quote Analysis Error:", error);
    return JSON.stringify({
      recommendations: [{ productName: "Absolute", reason: "Standard high-performance choice for most U.S. climates." }],
      analysis: "Automatic analysis failed, but our experts recommend Absolute for its versatility."
    });
  }
};
