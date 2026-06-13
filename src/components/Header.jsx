import React from 'react';
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
            <NavLink to="/" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
              <BookHeart size={20} />
              <span>Dashboard</span>
            </NavLink>
            <NavLink to="/journal" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
              <BookHeart size={20} />
              <span>Journal</span>
            </NavLink>
            <NavLink to="/analytics" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
              <LineChart size={20} />
              <span>Analytics</span>
            </NavLink>
            <NavLink to="/resources" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
              <Leaf size={20} />
              <span>Resources</span>
            </NavLink>
            <NavLink to="/companion" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
              <MessageCircleHeart size={20} />
              <span>Companion</span>
            </NavLink>
            <NavLink to="/settings" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
              <SettingsIcon size={20} />
              <span>Settings</span>
            </NavLink>
          </>
        ) : (
          <NavLink to="/login" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
            <SettingsIcon size={20} />
            <span>Login</span>
          </NavLink>
        )}
      </nav>
    </header>
  );
};

export default Header;

