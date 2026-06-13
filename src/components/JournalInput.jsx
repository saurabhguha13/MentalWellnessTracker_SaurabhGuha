import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addJournal } from '../store/slices/wellnessSlice';
import { PenTool, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import './JournalInput.css';
import { analyzeJournalEntry } from '../services/ai';
import InsightCard from './InsightCard';

const JournalInput = () => {
  const [text, setText] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [currentAnalysis, setCurrentAnalysis] = useState(null);
  const dispatch = useDispatch();

  const handleAnalyze = async () => {
    if (!text.trim()) return;
    setIsAnalyzing(true);
    setCurrentAnalysis(null);
    try {
      const analysis = await analyzeJournalEntry(text);
      setCurrentAnalysis(analysis);
      dispatch(addJournal({ text, analysis }));
      setText('');
    } catch (error) {
      console.error(error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <motion.div 
      className="journal-container"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="journal-input glass">
        <div className="input-header">
          <PenTool size={20} color="var(--primary)" />
          <h3>Unload your mind</h3>
        </div>
        <textarea
          placeholder="How did your study session go? Any specific topics stressing you out?"
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={6}
          disabled={isAnalyzing}
        ></textarea>
        <div className="input-footer">
          <motion.button 
            className="btn btn-primary" 
            onClick={handleAnalyze}
            disabled={!text.trim() || isAnalyzing}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {isAnalyzing ? <Loader2 className="spinner" size={18} /> : 'Analyze & Save'}
          </motion.button>
        </div>
      </div>
      
      <AnimatePresence>
        {currentAnalysis && (
          <motion.div 
            className="analysis-result"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
          >
            <InsightCard analysis={currentAnalysis} />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default JournalInput;

