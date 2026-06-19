import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  
  const profile = user?.profile || {};
  const readiness = profile.readiness || 20;

  // Onboarding items evaluation
  const checklist = [
    { label: "Define target degree", done: !!profile.targetDegree },
    { label: "Specify preferred country", done: !!profile.preferredCountry },
    { label: "Set financial budget", done: !!profile.budget },
    { label: "Enter academic CGPA score", done: !!profile.cgpa },
    { label: "Add standardized GRE score", done: !!profile.greScore }
  ];

  // ROI Mock data (Salary projection in Lakhs)
  const roiData = [
    { yr: "Year 1", val: 18, height: "40%" },
    { yr: "Year 2", val: 24, height: "55%" },
    { yr: "Year 3", val: 32, height: "70%" },
    { yr: "Year 4", val: 40, height: "85%" },
    { yr: "Year 5", val: 52, height: "100%" }
  ];

  return (
    <div id="page-dashboard">
      <div className="dash-header">
        <div>
          <h2>Welcome Back, {user?.name?.split(' ')[0] || 'Student'} 👋</h2>
          <p style={{ fontSize: '14px', color: 'var(--text-secondary)', marginTop: '4px' }}>Here is your study abroad application health dashboard.</p>
        </div>
        <div className="avatar">{user?.name ? user.name.substring(0, 2).toUpperCase() : 'ST'}</div>
      </div>
      
      {/* Readiness Indicator Card */}
      <div className="progress-section">
        <div className="progress-label">
          <span>Application Readiness Score</span>
          <span>{readiness}%</span>
        </div>
        <div className="progress-bar">
          <div className="progress-fill" style={{ width: `${readiness}%` }}></div>
        </div>
        <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginTop: '10px' }}>
          {readiness < 100 
            ? "Complete the profile checklist below to maximize your admission match index." 
            : "Congratulations! Your profile is fully complete and optimized for AI counseling."}
        </p>
      </div>

      {/* Grid Cards */}
      <div className="dash-grid">
        <div className="dash-card" onClick={() => navigate('/recommendations')}>
          <div className="card-icon">🌍</div>
          <div className="card-val">{profile.preferredCountry || 'USA, Canada, Germany'}</div>
          <div className="card-sub">Preferred Country Preference</div>
        </div>
        
        <div className="dash-card" onClick={() => navigate('/recommendations')}>
          <div className="card-icon">🎓</div>
          <div className="card-val">12 Matches Found</div>
          <div className="card-sub">3 High Chance · 9 Target Matches</div>
        </div>
        
        <div className="dash-card">
          <div className="card-icon">📈</div>
          <div className="card-val" style={{ color: 'var(--success)' }}>72% Average Admit</div>
          <div className="card-sub">Estimated Shortlist Probability</div>
        </div>
        
        <div className="dash-card" onClick={() => navigate('/loan')}>
          <div className="card-icon">💡</div>
          <div className="card-val">3.2x ROI in 5 Yrs</div>
          <div className="card-sub">Expected Post-Grad Return Index</div>
        </div>
      </div>

      {/* Details Row: ROI chart and checklist */}
      <div className="dashboard-details-row">
        {/* ROI Projection chart */}
        <div className="dashboard-section-card">
          <h3>📊 Estimated Salary ROI Projection (LPA)</h3>
          <div className="roi-chart">
            {roiData.map((data, idx) => (
              <div key={idx} className="chart-col">
                <span className="chart-val-hint">₹{data.val}L</span>
                <div className="chart-bar-wrap" style={{ height: '100px' }}>
                  <div className="chart-bar-fill" style={{ height: data.height }}></div>
                </div>
                <span className="chart-lbl">{data.yr}</span>
              </div>
            ))}
          </div>
          <p style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '12px', lineHeight: 1.4 }}>
            Based on average post-grad starting salaries in {profile.preferredCountry || "USA"} for {profile.targetDegree || "Computer Science"} fields.
          </p>
        </div>

        {/* Completeness Checklist */}
        <div className="dashboard-section-card">
          <h3>✦ Profile Completion Onboarding</h3>
          <div className="checklist-list">
            {checklist.map((item, idx) => (
              <div key={idx} className={`checklist-item ${item.done ? 'done' : ''}`} onClick={() => navigate('/profile')}>
                <div className="checklist-check">
                  {item.done ? '✓' : ''}
                </div>
                <span>{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
