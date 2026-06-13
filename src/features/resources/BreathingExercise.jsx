import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Wind } from 'lucide-react';
import './BreathingExercise.css';

const BreathingExercise = () => {
  const [phase, setPhase] = useState('idle'); // idle, inhale, hold, exhale
  const [timeLeft, setTimeLeft] = useState(0);

  useEffect(() => {
    let timer;
    if (phase === 'inhale') {
      setTimeout(() => setTimeLeft(4), 0);
      timer = setInterval(() => setTimeLeft((t) => t - 1), 1000);
      setTimeout(() => setPhase('hold'), 4000);
    } else if (phase === 'hold') {
      setTimeout(() => setTimeLeft(7), 0);
      timer = setInterval(() => setTimeLeft((t) => t - 1), 1000);
      setTimeout(() => setPhase('exhale'), 7000);
    } else if (phase === 'exhale') {
      setTimeout(() => setTimeLeft(8), 0);
      timer = setInterval(() => setTimeLeft((t) => t - 1), 1000);
      setTimeout(() => setPhase('inhale'), 8000);
    }
    return () => clearInterval(timer);
  }, [phase]);

  const toggleExercise = () => {
    if (phase === 'idle') setPhase('inhale');
    else setPhase('idle');
  };

  const getInstructions = () => {
    switch (phase) {
      case 'inhale': return 'Breathe In...';
      case 'hold': return 'Hold...';
      case 'exhale': return 'Breathe Out...';
      default: return 'Start 4-7-8 Breathing';
    }
  };

  const getScale = () => {
    if (phase === 'idle') return 1;
    if (phase === 'inhale') return 1.5;
    if (phase === 'hold') return 1.5;
    if (phase === 'exhale') return 1;
    return 1;
  };

  return (
    <div className="breathing-container glass">
      <div className="breathing-header">
        <Wind color="var(--secondary)" size={24} />
        <h3>Focus & Calm</h3>
      </div>
      <p className="breathing-desc">The 4-7-8 technique helps reduce anxiety and prepare you for deep focus.</p>
      
      <div className="animation-area">
        <motion.div 
          className="breathing-circle"
          animate={{ scale: getScale() }}
          transition={{ 
            duration: phase === 'inhale' ? 4 : phase === 'exhale' ? 8 : 0, 
            ease: "easeInOut" 
          }}
        >
          <div className="circle-inner" onClick={toggleExercise}>
            <AnimatePresence mode="wait">
              <motion.span
                key={phase}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="breathing-text"
              >
                {getInstructions()}
              </motion.span>
            </AnimatePresence>
            {phase !== 'idle' && (
              <span className="timer">{timeLeft > 0 ? timeLeft : ''}</span>
            )}
          </div>
        </motion.div>
      </div>
      
      {phase !== 'idle' && (
        <button className="btn btn-secondary stop-btn" onClick={() => setPhase('idle')}>
          Stop Exercise
        </button>
      )}
    </div>
  );
};

export default BreathingExercise;
