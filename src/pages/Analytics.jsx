import React from 'react';
import { motion } from 'framer-motion';
import AnalyticsChart from '../features/analytics/AnalyticsChart';
import './Analytics.css';

const Analytics = () => {
  return (
    <motion.div 
      className="analytics-page"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4 }}
    >
      <header className="page-header">
        <h2>Your Wellness Analytics</h2>
        <p>Visualize your journey and identify patterns over time.</p>
      </header>

      <div className="chart-container glass">
        <h3>Mood Trends</h3>
        <AnalyticsChart />
      </div>
    </motion.div>
  );
};

export default Analytics;
