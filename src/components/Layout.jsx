import React, { useState } from 'react';
import Sidebar from './Sidebar';

const Layout = ({ children }) => {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="app">
      {/* Mobile Header Bar */}
      <div className="mobile-topbar">
        <button className="menu-btn" onClick={() => setMobileOpen(!mobileOpen)}>
          {mobileOpen ? '✕' : '☰'}
        </button>
        <span className="logo-text" style={{fontWeight: 600, color: 'var(--text-main)'}}>EduAI</span>
        <div style={{width: 20}}></div>
      </div>

      <Sidebar mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />
      
      <div className="main" onClick={() => setMobileOpen(false)}>
        <div className="page active">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Layout;
