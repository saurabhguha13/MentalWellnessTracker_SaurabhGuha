import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { addFocusSession } from '../../store/slices/wellnessSlice';
import { motion } from 'framer-motion';
import { Play, Pause, Square, Timer } from 'lucide-react';
import './PomodoroTimer.css';

const PomodoroTimer = () => {
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isActive, setIsActive] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    let interval = null;
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
    } else if (timeLeft === 0 && isActive) {
      setIsActive(false);
      dispatch(addFocusSession({ duration: 25, type: 'pomodoro' }));
      // Optional: Play a sound here
    }
    return () => clearInterval(interval);
  }, [isActive, timeLeft, dispatch]);

  const toggleTimer = () => {
    setIsActive(!isActive);
  };

  const resetTimer = () => {
    setIsActive(false);
    setTimeLeft(25 * 60);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Calculate percentage for SVG stroke
  const progress = ((25 * 60 - timeLeft) / (25 * 60)) * 100;

  return (
    <div className="timer-container glass">
      <div className="timer-header">
        <Timer color="var(--primary)" />
        <h3>Focus Timer</h3>
      </div>
      
      <div className="timer-visual">
        <svg className="timer-ring" viewBox="0 0 100 100">
          <circle className="timer-ring-bg" cx="50" cy="50" r="45" />
          <motion.circle 
            className="timer-ring-progress" 
            cx="50" cy="50" r="45"
            strokeDasharray="283"
            strokeDashoffset={283 - (283 * progress) / 100}
            transition={{ duration: 1, ease: "linear" }}
          />
        </svg>
        <div className="timer-text">{formatTime(timeLeft)}</div>
      </div>

      <div className="timer-controls">
        <button className="control-btn play-btn" onClick={toggleTimer}>
          {isActive ? <Pause size={24} /> : <Play size={24} />}
        </button>
        <button className="control-btn reset-btn" onClick={resetTimer}>
          <Square size={20} />
        </button>
      </div>
    </div>
  );
};

export default PomodoroTimer;
