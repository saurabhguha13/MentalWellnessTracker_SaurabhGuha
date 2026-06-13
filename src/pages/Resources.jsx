import { motion } from 'framer-motion';
import BreathingExercise from '../features/resources/BreathingExercise';
import PomodoroTimer from '../features/timer/PomodoroTimer';
import './Resources.css';

const Resources = () => {
  return (
    <motion.div 
      className="resources-page"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.4 }}
    >
      <header className="page-header">
        <h2>Wellness Resources & Tools</h2>
        <p>Interactive exercises and timers to maintain your focus and calm.</p>
      </header>

      <div className="resources-grid">
        <BreathingExercise />
        <PomodoroTimer />
      </div>
    </motion.div>
  );
};

export default Resources;
