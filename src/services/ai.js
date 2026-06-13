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
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

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
    const model = genAI.getGenerativeModel({ 
      model: "gemini-2.5-flash",
      systemInstruction: "You are an empathetic, student-focused mental wellness companion called Samridhi. Keep your responses brief, supportive, and highly practical. You are chatting with a student preparing for stressful exams."
    });

    // The 'history' array passed from the UI includes the current message at the end.
    // We must exclude it from the history passed to startChat, as sendMessage will append it.
    const previousHistory = history.slice(0, -1);

    // Gemini requires the first message in history to be from the 'user'
    const firstUserIndex = previousHistory.findIndex(msg => msg.sender === 'user');
    const validHistory = firstUserIndex >= 0 ? previousHistory.slice(firstUserIndex) : [];

    const chat = model.startChat({
      history: validHistory.map(msg => ({
        role: msg.sender === 'user' ? 'user' : 'model',
        parts: [{ text: msg.text || '' }],
      })),
    });

    // Send the current message cleanly without repetitive prompt wrappers
    const result = await chat.sendMessage(currentMessage);
    return result.response.text();
  } catch (error) {
    console.error("AI Companion Error:", error);
    if (error.message.includes('Global Gemini API Key is missing')) {
      return "Hi there! It looks like the app isn't connected to the AI server yet. The developer needs to add the VITE_GEMINI_API_KEY.";
    }
    return "I'm having a little trouble connecting right now, but I'm here for you! Take a deep breath, and we'll try again in a moment.";
  }
};
