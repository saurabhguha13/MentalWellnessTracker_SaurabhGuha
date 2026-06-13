import React, { useState } from 'react';
import { PenTool, Loader2 } from 'lucide-react';
import './JournalInput.css';
import { analyzeJournalEntry } from '../services/ai';
import { useWellness } from '../context/WellnessContext';
import InsightCard from './InsightCard';

const JournalInput = () => {
  const [text, setText] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [currentAnalysis, setCurrentAnalysis] = useState(null);
  const { addJournal } = useWellness();

  const handleAnalyze = async () => {
    if (!text.trim()) return;
    setIsAnalyzing(true);
    setCurrentAnalysis(null);
    try {
      const analysis = await analyzeJournalEntry(text);
      setCurrentAnalysis(analysis);
      addJournal(text, analysis);
      setText('');
    } catch (error) {
      console.error(error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="journal-container">
      <div className="journal-input glass fade-in">
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
          <button 
            className="btn btn-primary" 
            onClick={handleAnalyze}
            disabled={!text.trim() || isAnalyzing}
          >
            {isAnalyzing ? <Loader2 className="spinner" size={18} /> : 'Analyze & Save'}
          </button>
        </div>
      </div>
      
      {currentAnalysis && (
        <div className="analysis-result fade-in">
          <InsightCard analysis={currentAnalysis} />
        </div>
      )}
    </div>
  );
};

export default JournalInput;
