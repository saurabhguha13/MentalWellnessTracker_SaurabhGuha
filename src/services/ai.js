import { GoogleGenerativeAI } from '@google/generative-ai';

// Helper to get genAI instance using global environment variable
const getGenAI = () => {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error('Global Gemini API Key is missing. Please configure VITE_GEMINI_API_KEY in your .env file or Vercel Environment Variables.');
  }
  return new GoogleGenerativeAI(apiKey);
};

export const analyzeJournalEntry = async (text) => {
  try {
    const genAI = getGenAI();
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `
      You are an empathetic, student-focused mental wellness companion.
      Analyze the following journal entry from a student preparing for competitive exams.
      Provide:
      1. An emotional summary (1 sentence).
      2. Identified stress triggers (comma separated list).
      3. A hyper-personalized, actionable coping strategy.
      4. A short, encouraging motivational quote.
      
      Format the response exactly as a JSON object with keys: "summary", "triggers", "strategy", "quote".
      Return ONLY valid JSON.
      
      Journal Entry: "${text}"
    `;

    const result = await model.generateContent(prompt);
    const responseText = result.response.text();
    
    // Attempt to parse JSON safely
    const cleanedText = responseText.replace(/```json\n?|\n?```/g, '').trim();
    return JSON.parse(cleanedText);
  } catch (error) {
    console.error("AI Analysis Error:", error);
    // If API key is missing, return a special error format to show in the UI
    if (error.message.includes('Global Gemini API Key is missing')) {
      return {
        summary: "API Key Required",
        triggers: ["Missing Configuration"],
        strategy: "The developer needs to configure VITE_GEMINI_API_KEY for the AI to work.",
        quote: "Hang tight while the app gets configured."
      };
    }
    return {
      summary: "We couldn't analyze this right now.",
      triggers: ["Technical Error"],
      strategy: "Take a deep breath and try again later.",
      quote: "Every step forward is progress."
    };
  }
};

export const generateCompanionResponse = async (history, currentMessage) => {
  try {
    const genAI = getGenAI();
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const chat = model.startChat({
      history: history.map(msg => ({
        role: msg.role === 'user' ? 'user' : 'model',
        parts: [{ text: msg.content }],
      })),
      generationConfig: {
        maxOutputTokens: 200,
      },
    });

    const result = await chat.sendMessage(`As an empathetic companion for students, reply to: ${currentMessage}. Keep it brief, supportive, and practical.`);
    return result.response.text();
  } catch (error) {
    console.error("AI Companion Error:", error);
    if (error.message.includes('Global Gemini API Key is missing')) {
      return "Hi there! It looks like the app isn't connected to the AI server yet. The developer needs to add the VITE_GEMINI_API_KEY.";
    }
    return "I'm having a little trouble connecting right now, but I'm here for you! Take a deep breath, and we'll try again in a moment.";
  }
};
