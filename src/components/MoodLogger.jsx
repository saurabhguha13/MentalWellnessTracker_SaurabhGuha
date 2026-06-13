import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addMoodLogToCloud, addMoodLogLocal } from '../store/slices/wellnessSlice';
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
  const user = useSelector((state) => state.auth.user);
  const [selected, setSelected] = useState(null);

  const handleSelect = (mood) => {
    setSelected(mood.value);
    // Optimistic local update
    // eslint-disable-next-line react-hooks/purity
    dispatch(addMoodLogLocal({ id: Date.now().toString(), date: new Date().toISOString(), mood: mood.value }));
    if (user?.uid) {
      dispatch(addMoodLogToCloud({ uid: user.uid, mood: mood.value }));
    }
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
            aria-pressed={selected === m.value}
            aria-label={`Log mood as ${m.label}`}
          >
            <span className="emoji" aria-hidden="true">{m.emoji}</span>
            <span className="label">{m.label}</span>
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
};

export default MoodLogger;

