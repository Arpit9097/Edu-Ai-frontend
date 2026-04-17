import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  
  // Provide defaults if user profile is empty
  const profile = user?.profile || {};
  const readiness = profile.readiness || 20;

  return (
    <div id="page-dashboard">
      <div className="dash-header">
        <div>
          <h2>Hi {user?.name.split(' ')[0] || 'Student'} 👋</h2>
          <p style={{fontSize: '13px', color: 'var(--color-text-secondary)', marginTop: '2px'}}>Here's your study abroad readiness overview</p>
        </div>
        <div className="avatar">{user?.name ? user.name.substring(0, 2).toUpperCase() : 'ST'}</div>
      </div>
      
      <div className="progress-section">
        <div className="progress-label">
          <span>Application readiness</span>
          <span>{readiness}%</span>
        </div>
        <div className="progress-bar">
          <div className="progress-fill" style={{width: `${readiness}%`}}></div>
        </div>
        <p style={{fontSize: '12px', color: 'var(--color-text-secondary)', marginTop: '8px'}}>Complete your profile to increase your readiness score</p>
      </div>

      <div className="dash-grid">
        <div className="dash-card" onClick={() => navigate('/recommendations')}>
          <div className="card-icon">🌍</div>
          <div style={{fontSize: '12px', color: 'var(--color-text-secondary)', marginBottom: '4px'}}>Recommended countries</div>
          <div className="card-val">{profile.preferredCountry || 'USA, Canada, Germany'}</div>
          <div className="card-sub">Based on your profile</div>
        </div>
        <div className="dash-card" onClick={() => navigate('/recommendations')}>
          <div className="card-icon">🎓</div>
          <div style={{fontSize: '12px', color: 'var(--color-text-secondary)', marginBottom: '4px'}}>Suggested universities</div>
          <div className="card-val">12 matches found</div>
          <div className="card-sub">3 high chance, 9 moderate</div>
        </div>
        <div className="dash-card">
          <div className="card-icon">📈</div>
          <div style={{fontSize: '12px', color: 'var(--color-text-secondary)', marginBottom: '4px'}}>Admission probability</div>
          <div className="card-val" style={{color: '#059669'}}>72% avg</div>
          <div className="card-sub">Across your shortlist</div>
        </div>
        <div className="dash-card" onClick={() => navigate('/loan')}>
          <div className="card-icon">💡</div>
          <div style={{fontSize: '12px', color: 'var(--color-text-secondary)', marginBottom: '4px'}}>ROI insights</div>
          <div className="card-val">3.2x in 5 yrs</div>
          <div className="card-sub">Expected return on investment</div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
