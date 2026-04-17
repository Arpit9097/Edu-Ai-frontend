import React from 'react';
import { NavLink } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="logo">
        <div className="logo-icon">✦</div>
        <span className="logo-text">EduAI</span>
      </div>
      <NavLink to="/home" className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}>
        <span className="nav-icon">🏠</span> Home
      </NavLink>
      <NavLink to="/chat" className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}>
        <span className="nav-icon">💬</span> AI Chat
      </NavLink>
      <NavLink to="/dashboard" className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}>
        <span className="nav-icon">📊</span> Dashboard
      </NavLink>
      <NavLink to="/recommendations" className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}>
        <span className="nav-icon">🎓</span> Universities
      </NavLink>
      <NavLink to="/loan" className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}>
        <span className="nav-icon">💰</span> Loan Planner
      </NavLink>
      <NavLink to="/profile" className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}>
        <span className="nav-icon">👤</span> Profile
      </NavLink>
      <div className="sidebar-bottom">
        <div className="nav-item"><span className="nav-icon">⚙️</span> Settings</div>
      </div>
    </div>
  );
};

export default Sidebar;
