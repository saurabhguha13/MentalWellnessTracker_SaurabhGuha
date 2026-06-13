import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Brain, BookHeart, MessageCircleHeart, LineChart, Leaf, Settings as SettingsIcon } from 'lucide-react';
import './Header.css';

const Header = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  return (
    <header className="header glass">
      <div className="header-logo">
        <Brain className="logo-icon" size={28} />
        <h1>Samridhi</h1>
      </div>
      <nav className="header-nav">
        {isAuthenticated ? (
          <>
            <NavLink to="/" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"} aria-label="Chat Companion">
              <MessageCircleHeart size={20} aria-hidden="true" />
              <span>Companion</span>
            </NavLink>
            <NavLink to="/dashboard" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"} aria-label="View Dashboard">
              <BookHeart size={20} aria-hidden="true" />
              <span>Dashboard</span>
            </NavLink>
            <NavLink to="/journal" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"} aria-label="Write in Journal">
              <BookHeart size={20} aria-hidden="true" />
              <span>Journal</span>
            </NavLink>
            <NavLink to="/analytics" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"} aria-label="View Analytics">
              <LineChart size={20} aria-hidden="true" />
              <span>Analytics</span>
            </NavLink>
            <NavLink to="/resources" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"} aria-label="Study Resources">
              <Leaf size={20} aria-hidden="true" />
              <span>Resources</span>
            </NavLink>

            <NavLink to="/settings" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"} aria-label="Account Settings">
              <SettingsIcon size={20} aria-hidden="true" />
              <span>Settings</span>
            </NavLink>
          </>
        ) : (
          <NavLink to="/login" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"} aria-label="Login">
            <SettingsIcon size={20} aria-hidden="true" />
            <span>Login</span>
          </NavLink>
        )}
      </nav>
    </header>
  );
};

export default Header;

