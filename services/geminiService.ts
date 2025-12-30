
import { GoogleGenAI, Type } from "@google/genai";
import { Quote } from "../types";

export const generateQuote = async (topic: string): Promise<Quote> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
  
  const prompt = `Generate a beautiful, meaningful, or cute quote about "${topic}". 
  The quote should be inspiring and aesthetic.
  Return the result in JSON format with "text" and "author" fields.`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            text: {
              type: Type.STRING,
              description: "The body of the quote",
            },
            author: {
              type: Type.STRING,
              description: "The author of the quote (can be 'Unknown' or a famous person)",
            },
          },
          required: ["text", "author"],
        },
      },
    });

    const result = JSON.parse(response.text || "{}");
    return {
      text: result.text || "Life is what happens when you're busy making other plans.",
      author: result.author || "John Lennon",
      category: topic
    };
  } catch (error) {
    console.error("Error generating quote:", error);
    return {
      text: "Every cloud has a silver lining.",
      author: "Common Proverb",
      category: topic
    };
  }
};
