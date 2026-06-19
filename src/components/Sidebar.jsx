import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Sidebar = ({ mobileOpen, setMobileOpen }) => {
  const { user } = useContext(AuthContext);

  const handleLinkClick = () => {
    if (setMobileOpen) {
      setMobileOpen(false);
    }
  };

  return (
    <div className={`sidebar ${mobileOpen ? 'mobile-open' : ''}`}>
      <div className="logo">
        <div className="logo-icon">✦</div>
        <span className="logo-text">EduAI</span>
      </div>
      <NavLink to="/home" onClick={handleLinkClick} className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}>
        <span className="nav-icon">🏠</span> Home
      </NavLink>
      <NavLink to="/chat" onClick={handleLinkClick} className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}>
        <span className="nav-icon">💬</span> AI Chat
      </NavLink>
      <NavLink to="/dashboard" onClick={handleLinkClick} className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}>
        <span className="nav-icon">📊</span> Dashboard
      </NavLink>
      <NavLink to="/recommendations" onClick={handleLinkClick} className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}>
        <span className="nav-icon">🎓</span> Universities
      </NavLink>
      <NavLink to="/loan" onClick={handleLinkClick} className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}>
        <span className="nav-icon">💰</span> Loan Planner
      </NavLink>
      <NavLink to="/profile" onClick={handleLinkClick} className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}>
        <span className="nav-icon">👤</span> Profile
      </NavLink>
      
      <div className="sidebar-bottom">
        <div className="nav-item"><span className="nav-icon">⚙️</span> Settings</div>
        {user && (
          <div className="sidebar-user">
            <div className="avatar">{user.name ? user.name.substring(0, 2).toUpperCase() : 'ST'}</div>
            <div className="info">
              <div className="name">{user.name || 'Student'}</div>
              <div className="email">{user.email || 'student@eduai.local'}</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
