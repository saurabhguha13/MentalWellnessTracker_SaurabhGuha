import React from 'react';
import MoodLogger from '../components/MoodLogger';
import InsightCard from '../components/InsightCard';
import { useWellness } from '../context/WellnessContext';
import { Calendar, Target, Award } from 'lucide-react';
import './Dashboard.css';

const Dashboard = () => {
  const { journals, moodLogs } = useWellness();

  // Basic stats
  const totalEntries = journals.length;
  const avgMood = moodLogs.length > 0 
    ? Math.round(moodLogs.reduce((acc, log) => acc + log.mood, 0) / moodLogs.length) 
    : '-';
    
  const latestAnalysis = journals.length > 0 ? journals[0].analysis : null;

  return (
    <div className="dashboard-page fade-in">
      <header className="page-header">
        <h2>Welcome back!</h2>
        <p>Let's check in on your preparation journey.</p>
      </header>

      <MoodLogger />

      <div className="stats-grid">
        <div className="stat-card glass">
          <Calendar color="var(--primary)" />
          <div className="stat-info">
            <span className="stat-value">{totalEntries}</span>
            <span className="stat-label">Journal Entries</span>
          </div>
        </div>
        <div className="stat-card glass">
          <Target color="var(--primary)" />
          <div className="stat-info">
            <span className="stat-value">{avgMood}</span>
            <span className="stat-label">Avg Mood Score</span>
          </div>
        </div>
        <div className="stat-card glass">
          <Award color="var(--primary)" />
          <div className="stat-info">
            <span className="stat-value">On Track</span>
            <span className="stat-label">Study Status</span>
          </div>
        </div>
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
    </div>
  );
};

export default Dashboard;
