import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();
  return (
    <div id="page-landing">
      <div className="hero">
        <div className="hero-badge">✦ AI-Powered Education Planning</div>
        <h1>Your AI Companion for<br/><span>Study Abroad & Education Loans</span></h1>
        <p>Get personalized university recommendations, career guidance, and loan planning — all in one place. Built for Indian students aiming higher.</p>
        <button className="btn-primary" onClick={() => navigate('/chat')}>Start Your Journey →</button>
        <div className="ai-visual">✦</div>
      </div>
      <div className="feature-grid">
        <div className="feature-card">
          <div className="icon">🎯</div>
          <h3>Smart Matching</h3>
          <p>AI matches you with universities based on your profile, CGPA, and goals.</p>
        </div>
        <div className="feature-card">
          <div className="icon">💬</div>
          <h3>AI Counselor</h3>
          <p>Chat anytime about admissions, visa, SOP, and career planning.</p>
        </div>
        <div className="feature-card">
          <div className="icon">💳</div>
          <h3>Loan Planning</h3>
          <p>Check eligibility and calculate EMI for education loans up to ₹50L.</p>
        </div>
      </div>
    </div>
  );
};

export default Home;
