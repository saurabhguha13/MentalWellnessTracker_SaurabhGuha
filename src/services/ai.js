export const analyzeJournalEntry = async (text) => {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 1500));

  const lowercaseText = text.toLowerCase();
  let moodScore = 50;
  const triggers = [];
  let summary = "";

  // Mock analysis logic based on keywords common to student stress
  if (lowercaseText.includes("exam") || lowercaseText.includes("test") || lowercaseText.includes("syllabus")) {
    triggers.push("Academic Pressure");
    moodScore -= 10;
  }
  if (lowercaseText.includes("sleep") || lowercaseText.includes("tired") || lowercaseText.includes("exhausted")) {
    triggers.push("Sleep Deprivation");
    moodScore -= 15;
  }
  if (lowercaseText.includes("fail") || lowercaseText.includes("worry") || lowercaseText.includes("anxious")) {
    triggers.push("Fear of Failure");
    moodScore -= 20;
  }
  if (lowercaseText.includes("good") || lowercaseText.includes("productive") || lowercaseText.includes("happy")) {
    moodScore += 30;
  }

  // Ensure score is within 0-100
  moodScore = Math.max(0, Math.min(100, moodScore));

  if (moodScore > 70) {
    summary = "You're showing strong resilience today! Keep up the positive momentum.";
  } else if (moodScore > 40) {
    summary = "It seems like a balanced day, but there are underlying stressors. Remember to take short breaks.";
  } else {
    summary = "You seem to be carrying a lot of weight today. It's okay to feel overwhelmed. Let's focus on one small step at a time.";
  }

  return {
    moodScore,
    triggers: triggers.length > 0 ? triggers : ["None identified"],
    summary,
  };
};

export const generateCompanionResponse = async (history, currentMessage) => {
  await new Promise((resolve) => setTimeout(resolve, 1200));

  const lowerMsg = currentMessage.toLowerCase();
  
  if (lowerMsg.includes("stressed") || lowerMsg.includes("anxious")) {
    return "I hear you. High-stakes exams carry a lot of pressure. Let's try a quick 4-7-8 breathing exercise together. Inhale for 4 seconds, hold for 7, exhale for 8. Ready to give it a try?";
  } else if (lowerMsg.includes("behind") || lowerMsg.includes("syllabus")) {
    return "It's a common feeling, but remember you can only do one thing at a time. Have you tried the Pomodoro technique? 25 minutes of focused study, then a 5-minute break. What topic are you struggling with the most right now?";
  } else if (lowerMsg.includes("tired") || lowerMsg.includes("burnout")) {
    return "Burnout is real and your body is asking for a pause. Pushing through exhaustion often reduces retention. Could you take a 20-minute power nap or just close your eyes and listen to some calming music?";
  } else if (lowerMsg.includes("hi") || lowerMsg.includes("hello")) {
    return "Hello! I'm here for you. How is your prep going today? Be honest, this is a safe space.";
  }

  // Fallback generic response
  const fallbacks = [
    "That sounds tough. I want you to know that your worth isn't defined by an exam score. What's one small win you had today?",
    "I understand. Sometimes just talking it out helps. I'm here to listen. How long have you been studying today?",
    "Take a deep breath. You're doing the best you can, and that is enough. Have you hydrated recently?"
  ];
  return fallbacks[Math.floor(Math.random() * fallbacks.length)];
};
