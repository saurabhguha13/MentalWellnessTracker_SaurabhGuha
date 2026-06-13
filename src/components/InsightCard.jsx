import React from 'react';
import { Activity, AlertCircle, Heart } from 'lucide-react';
import './InsightCard.css';

const InsightCard = ({ analysis }) => {
  if (!analysis) return null;

  const { moodScore, triggers, summary } = analysis;

  const getScoreColor = (score) => {
    if (score > 70) return '#6EB29E'; // Green
    if (score > 40) return '#F2B950'; // Yellow
    return '#FF8F71'; // Coral
  };

  return (
    <div className="insight-card glass">
      <div className="insight-header">
        <Activity color="var(--primary)" />
        <h4>AI Analysis</h4>
      </div>
      
      <div className="insight-content">
        <div className="score-ring-container">
          <svg className="score-ring" viewBox="0 0 36 36">
            <path
              className="ring-bg"
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
            />
            <path
              className="ring-fill"
              strokeDasharray={`${moodScore}, 100`}
              stroke={getScoreColor(moodScore)}
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
            />
            <text x="18" y="20.35" className="ring-text">{moodScore}</text>
          </svg>
          <span className="score-label">Wellness Score</span>
        </div>

        <div className="insight-details">
          <p className="summary-text">{summary}</p>
          
          <div className="triggers-container">
            <h5><AlertCircle size={14}/> Identified Triggers</h5>
            <div className="trigger-tags">
              {triggers.map((trigger, i) => (
                <span key={i} className="trigger-tag">{trigger}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InsightCard;
