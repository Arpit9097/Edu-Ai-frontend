import React from 'react';
import Sidebar from './Sidebar';

const Layout = ({ children }) => {
  return (
    <div className="app">
      <Sidebar />
      <div className="main">
        <div className="page active">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Layout;
