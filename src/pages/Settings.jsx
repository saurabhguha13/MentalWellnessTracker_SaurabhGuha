import { useSelector, useDispatch } from 'react-redux';
import { logoutUser } from '../store/slices/authSlice';
import { motion } from 'framer-motion';
import { User, LogOut } from 'lucide-react';
import './Settings.css';

const Settings = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  return (
    <motion.div 
      className="settings-container"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <header className="dashboard-header">
        <h2>Settings</h2>
        <p>Manage your account and preferences.</p>
      </header>

      <div className="settings-content">
        <section className="settings-section glass">
          <h3><User size={20} /> Profile Information</h3>
          <div className="profile-info">
            <div className="info-group">
              <label>Name</label>
              <p>{user?.name || 'Student'}</p>
            </div>
            <div className="info-group">
              <label>Email</label>
              <p>{user?.email || 'Not provided'}</p>
            </div>
          </div>
        </section>

        <section className="settings-section">
          <button className="btn btn-danger logout-btn" onClick={handleLogout}>
            <LogOut size={20} />
            Log Out
          </button>
        </section>
      </div>
    </motion.div>
  );
};

export default Settings;
