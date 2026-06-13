import React from 'react';
import './MoodLogger.css';
import { useWellness } from '../context/WellnessContext';

const moods = [
  { emoji: '😭', label: 'Awful', value: 10 },
  { emoji: '😔', label: 'Bad', value: 30 },
  { emoji: '😐', label: 'Okay', value: 50 },
  { emoji: '🙂', label: 'Good', value: 70 },
  { emoji: '🤩', label: 'Great', value: 90 },
];

const MoodLogger = () => {
  const { addMoodLog } = useWellness();
  const [selected, setSelected] = React.useState(null);

  const handleSelect = (mood) => {
    setSelected(mood.value);
    addMoodLog(mood.value);
  };

  return (
    <div className="mood-logger glass fade-in">
      <h3>How are you feeling about your prep right now?</h3>
      <div className="mood-options">
        {moods.map((m) => (
          <button
            key={m.label}
            className={`mood-btn ${selected === m.value ? 'selected' : ''}`}
            onClick={() => handleSelect(m)}
          >
            <span className="emoji">{m.emoji}</span>
            <span className="label">{m.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default MoodLogger;
