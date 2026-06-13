import React from 'react';
import { NavLink } from 'react-router-dom';
import { Brain, BookHeart, MessageCircleHeart } from 'lucide-react';
import './Header.css';

const Header = () => {
  return (
    <header className="header glass">
      <div className="header-logo">
        <Brain className="logo-icon" size={28} />
        <h1>MindfulCompanion</h1>
      </div>
      <nav className="header-nav">
        <NavLink to="/" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
          <BookHeart size={20} />
          <span>Dashboard</span>
        </NavLink>
        <NavLink to="/journal" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
          <BookHeart size={20} />
          <span>Journal</span>
        </NavLink>
        <NavLink to="/companion" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
          <MessageCircleHeart size={20} />
          <span>Companion</span>
        </NavLink>
      </nav>
    </header>
  );
};

export default Header;
