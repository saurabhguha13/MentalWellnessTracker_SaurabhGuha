import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setApiKey, logoutUser } from '../store/slices/authSlice';
import { motion } from 'framer-motion';
import { User, Key, LogOut, CheckCircle } from 'lucide-react';
import './Settings.css';

const Settings = () => {
  const dispatch = useDispatch();
  const { user, apiKey } = useSelector((state) => state.auth);
  const [keyInput, setKeyInput] = useState(apiKey || '');
  const [saved, setSaved] = useState(false);

  const handleSaveKey = () => {
    dispatch(setApiKey(keyInput));
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  return (
    <motion.div 
      className="settings-page"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      transition={{ duration: 0.4 }}
    >
      <header className="page-header">
        <h2>Settings</h2>
        <p>Manage your profile and app preferences.</p>
      </header>

      <div className="settings-content">
        <div className="settings-section glass">
          <h3><User size={20} color="var(--primary)" /> Profile</h3>
          <div className="profile-info">
            <div className="info-group">
              <label>Name</label>
              <p>{user?.name}</p>
            </div>
            <div className="info-group">
              <label>Email</label>
              <p>{user?.email}</p>
            </div>
          </div>
          <button className="btn btn-secondary logout-btn" onClick={handleLogout}>
            <LogOut size={18} /> Logout
          </button>
        </div>

        <div className="settings-section glass">
          <h3><Key size={20} color="var(--primary)" /> API Configuration</h3>
          <p className="settings-desc">
            To use the advanced AI journal analysis and companion features, you need a Google Gemini API Key.
            Your key is saved locally in your browser and is never sent to our servers.
          </p>
          
          <div className="api-key-input-group">
            <input 
              type="password" 
              placeholder="Enter your Gemini API Key here (AIzaSy...)" 
              value={keyInput}
              onChange={(e) => setKeyInput(e.target.value)}
            />
            <button className="btn btn-primary" onClick={handleSaveKey}>
              Save Key
            </button>
          </div>
          
          {saved && (
            <motion.p 
              className="save-success"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <CheckCircle size={16} /> API Key saved successfully!
            </motion.p>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default Settings;
