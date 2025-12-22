
import { GoogleGenAI } from "@google/genai";
import { AppConfig, TabConfig, NextScreen } from "../types";

// Always initialize the client with the required parameter format
const getAiClient = () => new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateTabAdvice = async (type: string, sectionTitle: string): Promise<string> => {
  const ai = getAiClient();

  const prompt = `
    You are an expert UX consultant for Linkora.
    Current Section: "${sectionTitle}"
    Active Component: "${type}"
    
    Task: Write a short, professional advice message in English (2-3 sentences) for a user viewing this specific tab.
  `;

  try {
    // Correct usage of generateContent with gemini-3-flash-preview
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
    });
    // Property access .text is correct for GenerateContentResponse
    return response.text || "No response received.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "An error occurred while connecting to the Smart Assistant.";
  }
};

export const generateSaaSAdvice = async (config: AppConfig, activeTab: TabConfig): Promise<string> => {
  const ai = getAiClient();

  // Fix: Corrected property names to match AppConfig (navigation instead of tabs) and TabConfig (label instead of tabName)
  const hasCart = config.navigation.some(t => t.route === NextScreen.CART);
  const hasOffers = config.navigation.some(t => t.route === NextScreen.OFFERS);

  const prompt = `
    You are an expert UX consultant for Linkora SaaS platform.
    Client App Name: "${config.name}"
    Current Active Tab: "${activeTab.label}"
    Features Enabled: Cart=${hasCart}, Offers=${hasOffers}.
    
    Task: Write a short, professional advice message in English (2-3 sentences) for the user currently configuring this tab.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
    });
    return response.text || "No response received.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "An error occurred while connecting to the Smart Assistant.";
  }
};
