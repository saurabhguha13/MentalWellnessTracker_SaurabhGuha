import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { motion } from 'framer-motion';
import MoodLogger from '../components/MoodLogger';
import InsightCard from '../components/InsightCard';
import { Calendar, Target, Flame } from 'lucide-react';
import './Dashboard.css';

const Dashboard = () => {
  const dispatch = useDispatch();
  const { journals, moodLogs, streaks } = useSelector((state) => state.wellness);

  useEffect(() => {
    // Check login streak logic moved to auth flow
  }, [dispatch]);

  const totalEntries = journals.length;
  const avgMood = moodLogs.length > 0 
    ? Math.round(moodLogs.reduce((acc, log) => acc + log.mood, 0) / moodLogs.length) 
    : '-';
    
  const latestAnalysis = journals.length > 0 ? journals[0].analysis : null;

  return (
    <motion.div 
      className="dashboard-page"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      transition={{ duration: 0.4 }}
    >
      <header className="page-header">
        <h2>Welcome back!</h2>
        <p>Let's check in on your preparation journey.</p>
      </header>

      <MoodLogger />

      <div className="stats-grid">
        <motion.div className="stat-card glass" whileHover={{ y: -5 }}>
          <Flame color="var(--primary)" />
          <div className="stat-info">
            <span className="stat-value">{streaks.current}</span>
            <span className="stat-label">Day Streak</span>
          </div>
        </motion.div>
        <motion.div className="stat-card glass" whileHover={{ y: -5 }}>
          <Calendar color="var(--primary)" />
          <div className="stat-info">
            <span className="stat-value">{totalEntries}</span>
            <span className="stat-label">Journal Entries</span>
          </div>
        </motion.div>
        <motion.div className="stat-card glass" whileHover={{ y: -5 }}>
          <Target color="var(--primary)" />
          <div className="stat-info">
            <span className="stat-value">{avgMood}</span>
            <span className="stat-label">Avg Mood Score</span>
          </div>
        </motion.div>
      </div>

      {latestAnalysis ? (
        <div className="latest-insight">
          <h3>Latest AI Insight</h3>
          <InsightCard analysis={latestAnalysis} />
        </div>
      ) : (
        <div className="empty-state glass">
          <p>You haven't added any journal entries yet. Unload your thoughts in the Journal tab to get AI insights.</p>
        </div>
      )}
    </motion.div>
  );
};

export default Dashboard;

