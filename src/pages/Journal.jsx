import React from 'react';
import JournalInput from '../components/JournalInput';
import InsightCard from '../components/InsightCard';
import { useWellness } from '../context/WellnessContext';
import './Journal.css';

const Journal = () => {
  const { journals } = useWellness();

  return (
    <div className="journal-page fade-in">
      <header className="page-header">
        <h2>Your Journal</h2>
        <p>A safe space to reflect on your preparation and feelings.</p>
      </header>

      <JournalInput />

      {journals.length > 0 && (
        <div className="history-section">
          <h3>Past Entries</h3>
          <div className="journal-history-list">
            {journals.map((journal) => (
              <div key={journal.id} className="history-card glass">
                <div className="history-date">
                  {new Date(journal.date).toLocaleDateString(undefined, {
                    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
                  })}
                </div>
                <p className="history-text">"{journal.text}"</p>
                {journal.analysis && (
                  <div className="history-analysis">
                    <InsightCard analysis={journal.analysis} />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Journal;
