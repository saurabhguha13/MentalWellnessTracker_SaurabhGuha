import React from 'react';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import JournalInput from '../components/JournalInput';
import InsightCard from '../components/InsightCard';
import './Journal.css';

const Journal = () => {
  const journals = useSelector((state) => state.wellness.journals);

  return (
    <motion.div 
      className="journal-page"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      transition={{ duration: 0.4 }}
    >
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
              <motion.div 
                key={journal.id} 
                className="history-card glass"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
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
              </motion.div>
            ))}
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default Journal;

