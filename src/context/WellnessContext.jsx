import React, { createContext, useContext, useState, useEffect } from 'react';

const WellnessContext = createContext();

export const useWellness = () => {
  return useContext(WellnessContext);
};

export const WellnessProvider = ({ children }) => {
  const [journals, setJournals] = useState(() => {
    const saved = localStorage.getItem('wellness_journals');
    return saved ? JSON.parse(saved) : [];
  });

  const [moodLogs, setMoodLogs] = useState(() => {
    const saved = localStorage.getItem('wellness_moods');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('wellness_journals', JSON.stringify(journals));
  }, [journals]);

  useEffect(() => {
    localStorage.setItem('wellness_moods', JSON.stringify(moodLogs));
  }, [moodLogs]);

  const addJournal = (entry, analysis) => {
    const newJournal = {
      id: Date.now().toString(),
      date: new Date().toISOString(),
      text: entry,
      analysis: analysis,
    };
    setJournals([newJournal, ...journals]);
  };

  const addMoodLog = (mood) => {
    const newMood = {
      id: Date.now().toString(),
      date: new Date().toISOString(),
      mood: mood,
    };
    setMoodLogs([newMood, ...moodLogs]);
  };

  const value = {
    journals,
    addJournal,
    moodLogs,
    addMoodLog,
  };

  return (
    <WellnessContext.Provider value={value}>
      {children}
    </WellnessContext.Provider>
  );
};
