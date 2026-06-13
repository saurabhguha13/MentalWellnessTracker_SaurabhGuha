import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addFocusSessionToCloud, addFocusSessionLocal } from '../../store/slices/wellnessSlice';
import { motion } from 'framer-motion';
import { Play, Pause, Square, Timer } from 'lucide-react';
import './PomodoroTimer.css';

const PomodoroTimer = () => {
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isActive, setIsActive] = useState(false);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    let interval = null;
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
    } else if (timeLeft === 0 && isActive) {
      setTimeout(() => {
        setIsActive(false);
        const sessionData = { duration: 25, type: 'pomodoro' };
        dispatch(addFocusSessionLocal({ id: Date.now().toString(), date: new Date().toISOString(), durationMinutes: sessionData.duration, type: sessionData.type }));
        if (user?.uid) {
          dispatch(addFocusSessionToCloud({ uid: user.uid, durationMinutes: sessionData.duration, type: sessionData.type }));
        }
      }, 0);
    }
    return () => clearInterval(interval);
  }, [isActive, timeLeft, dispatch, user?.uid]);

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
        <button className="control-btn play-btn" onClick={toggleTimer} aria-label={isActive ? "Pause Timer" : "Start Timer"}>
          {isActive ? <Pause size={24} aria-hidden="true" /> : <Play size={24} aria-hidden="true" />}
        </button>
        <button className="control-btn reset-btn" onClick={resetTimer} aria-label="Reset Timer">
          <Square size={20} aria-hidden="true" />
        </button>
      </div>
    </div>
  );
};

export default PomodoroTimer;
