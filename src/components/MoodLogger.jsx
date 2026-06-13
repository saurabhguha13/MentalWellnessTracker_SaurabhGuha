import React from 'react';
import { useDispatch } from 'react-redux';
import { addMoodLog } from '../store/slices/wellnessSlice';
import { motion } from 'framer-motion';
import './MoodLogger.css';

const moods = [
  { emoji: '😭', label: 'Awful', value: 10 },
  { emoji: '😔', label: 'Bad', value: 30 },
  { emoji: '😐', label: 'Okay', value: 50 },
  { emoji: '🙂', label: 'Good', value: 70 },
  { emoji: '🤩', label: 'Great', value: 90 },
];

const MoodLogger = () => {
  const dispatch = useDispatch();
  const [selected, setSelected] = React.useState(null);

  const handleSelect = (mood) => {
    setSelected(mood.value);
    dispatch(addMoodLog(mood.value));
  };

  return (
    <motion.div 
      className="mood-logger glass"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
    >
      <h3>How are you feeling about your prep right now?</h3>
      <div className="mood-options">
        {moods.map((m) => (
          <motion.button
            key={m.label}
            className={`mood-btn ${selected === m.value ? 'selected' : ''}`}
            onClick={() => handleSelect(m)}
            whileHover={{ scale: 1.1, y: -5 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="emoji">{m.emoji}</span>
            <span className="label">{m.label}</span>
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
};

export default MoodLogger;

