import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateAIContent = async (prompt: string): Promise<string> => {
    try {
        const response = await ai.models.generateContent({
          model: 'gemini-2.5-flash',
          contents: prompt,
        });

        return response.text || "Lo siento, no pude generar una respuesta.";
    } catch (error) {
        console.error("Error calling Gemini:", error);
        return "Hubo un error al conectar con el asistente. Por favor intenta de nuevo.";
    }
};