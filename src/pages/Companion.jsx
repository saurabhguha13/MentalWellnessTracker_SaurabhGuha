import React from 'react';
import { motion } from 'framer-motion';
import CompanionChat from '../components/CompanionChat';
import './Companion.css';

const Companion = () => {
  return (
    <motion.div 
      className="companion-page"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      transition={{ duration: 0.4 }}
    >
      <CompanionChat />
    </motion.div>
  );
};

export default Companion;
