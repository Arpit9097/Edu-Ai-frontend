import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Home = () => {
  const navigate = useNavigate();
  const { user, login, register } = useContext(AuthContext);
  const [openFaq, setOpenFaq] = useState(null);

  // Modal and Auth state variables
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authTab, setAuthTab] = useState('login'); // 'login' | 'signup'
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const toggleFaq = (idx) => {
    setOpenFaq(openFaq === idx ? null : idx);
  };

  const openModal = (tab = 'login') => {
    setAuthTab(tab);
    setErrorMsg('');
    setSuccessMsg('');
    setName('');
    setEmail('');
    setPassword('');
    setShowAuthModal(true);
  };

  const handleTabChange = (tab) => {
    setAuthTab(tab);
    setErrorMsg('');
    setSuccessMsg('');
  };

  const handleAuthSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');
    setIsSubmitting(true);

    if (authTab === 'login') {
      const res = await login(email, password);
      if (res.success) {
        setSuccessMsg('Successfully logged in! Redirecting...');
        setTimeout(() => {
          setShowAuthModal(false);
          navigate('/dashboard');
        }, 800);
      } else {
        setErrorMsg(res.error || 'Invalid credentials');
      }
    } else {
      if (!name.trim()) {
        setErrorMsg('Name field is required');
        setIsSubmitting(false);
        return;
      }
      const res = await register(name, email, password);
      if (res.success) {
        setSuccessMsg('Account created successfully! Redirecting...');
        setTimeout(() => {
          setShowAuthModal(false);
          navigate('/dashboard');
        }, 800);
      } else {
        setErrorMsg(res.error || 'Registration failed');
      }
    }
    setIsSubmitting(false);
  };

  const handleGetStarted = () => {
    if (user && user.email !== 'guest@eduai.local') {
      navigate('/dashboard');
    } else {
      openModal('signup');
    }
  };

  const faqs = [
    { q: "How does the AI counselor work?", a: "Our AI counselor uses advanced LLMs to analyze your academic profile (like CGPA and GRE score), budget, and location preferences to recommend matched universities and guide you through the application steps." },
    { q: "Are these university admission chances accurate?", a: "Yes, our engine calculates admit probability by evaluating your scores against historical acceptance criteria and requirements from hundreds of international universities." },
    { q: "Can I customize the loan planner calculations?", a: "Absolutely. You can adjust the loan amount, interest rates, and loan terms on the fly. The planner instantly recalculates your monthly EMI and breaks down the repayment details." },
    { q: "Is my conversation history saved?", a: "Yes, all chat sessions with the AI counselor are saved under your personal profile so you can resume your academic search whenever you return." }
  ];

  return (
    <div id="page-landing" style={{ padding: 0 }}>
      {/* Landing Navigation Header */}
      <div className="landing-header">
        <div className="brand">
          <span className="logo-spark">✦</span>
          <span className="logo-text">EduAI Portal</span>
        </div>
        <div className="actions">
          {user && user.email !== 'guest@eduai.local' ? (
            <div className="user-welcome-badge" onClick={() => navigate('/dashboard')}>
              <div className="avatar">{user.name ? user.name.substring(0, 2).toUpperCase() : 'US'}</div>
              <span>Go to Dashboard</span>
            </div>
          ) : (
            <button className="get-started-trigger" onClick={() => openModal('login')}>
              🚀 Get Started / Login
            </button>
          )}
        </div>
      </div>

      {/* Hero Section */}
      <div className="hero">
        <div className="hero-badge">✦ AI-Powered Study Abroad Counselor</div>
        <h1>Simplify Your Global Education &<br/><span>Discover Your Perfect Loan Plan</span></h1>
        <p>Get personalized university recommendations, immediate career counseling, and simplified loan calculations — all inside a single SaaS portal designed for ambitious students.</p>
        <div style={{ display: 'inline-flex', justifyContent: 'center' }}>
          <button className="btn-primary" onClick={handleGetStarted}>Get Started for Free →</button>
          <button className="btn-secondary" onClick={() => navigate('/recommendations')}>View Universities</button>
        </div>
        <div className="ai-visual">✦</div>
      </div>

      {/* Feature Section */}
      <div className="feature-grid">
        <div className="feature-card">
          <div className="icon">🎯</div>
          <h3>Smart Profile Matching</h3>
          <p>Instantly align your academic standing (CGPA, GRE) and tuition budget with matching university intake programs.</p>
        </div>
        <div className="feature-card">
          <div className="icon">💬</div>
          <h3>24/7 AI Counselor</h3>
          <p>Receive immediate responses on SOP writing, visa document preparation, and living expense estimates abroad.</p>
        </div>
        <div className="feature-card">
          <div className="icon">💰</div>
          <h3>Smart Loan Planner</h3>
          <p>Input variables to get accurate EMI schedules, calculate interest payments, and plan out budget limits up to ₹50L.</p>
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="testimonials-section">
        <h2>Endorsed by Successful Students</h2>
        <div className="testimonials-grid">
          <div className="test-card">
            <p className="test-text">"EduAI helped me map my 8.2 CGPA to universities in the US. The AI counselor suggested Arizona State, and I got admitted!"</p>
            <div className="test-user">
              <div className="avatar">RM</div>
              <div>
                <div className="name">Rohan Mehta</div>
                <div className="meta">MS CS · ASU Graduate</div>
              </div>
            </div>
          </div>
          <div className="test-card">
            <p className="test-text">"The loan planner gave me a detailed EMI breakdown which helped me select the right financial partner for my Canada MS."</p>
            <div className="test-user">
              <div className="avatar">PS</div>
              <div>
                <div className="name">Priya Sharma</div>
                <div className="meta">Waterloo Admit</div>
              </div>
            </div>
          </div>
          <div className="test-card">
            <p className="test-text">"Comparing Germany public universities vs UK budgets was very simple using the chatbot. Saves hours of counseling visits."</p>
            <div className="test-user">
              <div className="avatar">AP</div>
              <div>
                <div className="name">Aarav Patel</div>
                <div className="meta">TU Munich Candidate</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="faq-section">
        <h2>Frequently Asked Questions</h2>
        <div className="faq-list">
          {faqs.map((faq, idx) => (
            <div key={idx} className="faq-item" onClick={() => toggleFaq(idx)}>
              <div className="faq-question">
                <span>{faq.q}</span>
                <span>{openFaq === idx ? '−' : '+'}</span>
              </div>
              {openFaq === idx && (
                <div className="faq-answer">{faq.a}</div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Footer Section */}
      <footer className="landing-footer">
        <div className="footer-grid">
          <div className="footer-brand">
            <h3>EduAI</h3>
            <p>Empowering the next generation of global students with AI-powered profile assessment and education loan mapping.</p>
          </div>
          <div className="footer-col">
            <h4>Features</h4>
            <ul>
              <li><a href="/chat">AI Chatbot</a></li>
              <li><a href="/recommendations">University Finder</a></li>
              <li><a href="/loan">Loan Calculator</a></li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>Resources</h4>
            <ul>
              <li><a href="/profile">My Profile</a></li>
              <li><a href="/dashboard">Admission Index</a></li>
              <li><a href="#">Support Hub</a></li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>Company</h4>
            <ul>
              <li><a href="#">About Us</a></li>
              <li><a href="#">Privacy Policy</a></li>
              <li><a href="#">Terms of Service</a></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} EduAI Platform. All rights reserved. Built for ambitious minds globally.</p>
        </div>
      </footer>

      {/* Auth Modal Overlay */}
      {showAuthModal && (
        <div className="auth-modal-overlay" onClick={() => setShowAuthModal(false)}>
          <div className="auth-modal-card" onClick={(e) => e.stopPropagation()}>
            <button className="auth-modal-close" onClick={() => setShowAuthModal(false)}>✕</button>
            
            <div className="auth-modal-header">
              <span className="auth-modal-logo">✦</span>
              <h3 className="auth-modal-title">
                {authTab === 'login' ? 'Welcome Back' : 'Create Account'}
              </h3>
              <p className="auth-modal-subtitle">
                {authTab === 'login' 
                  ? 'Access your saved profiles and university shortlists.' 
                  : 'Start tracking your study abroad applications today.'}
              </p>
            </div>

            <div className="auth-tabs-nav">
              <button 
                type="button" 
                className={`auth-tab-btn ${authTab === 'login' ? 'active' : ''}`}
                onClick={() => handleTabChange('login')}
              >
                Sign In
              </button>
              <button 
                type="button" 
                className={`auth-tab-btn ${authTab === 'signup' ? 'active' : ''}`}
                onClick={() => handleTabChange('signup')}
              >
                Create Account
              </button>
            </div>

            {errorMsg && (
              <div className="alert-box error" style={{ padding: '8px 12px', fontSize: '13px', marginBottom: '16px' }}>
                ⚠️ {errorMsg}
              </div>
            )}
            {successMsg && (
              <div className="alert-box success" style={{ padding: '8px 12px', fontSize: '13px', marginBottom: '16px' }}>
                ✓ {successMsg}
              </div>
            )}

            <form onSubmit={handleAuthSubmit} className="auth-form">
              {authTab === 'signup' && (
                <div className="form-group" style={{ marginBottom: '4px' }}>
                  <label htmlFor="auth-name">Full Name</label>
                  <input
                    id="auth-name"
                    type="text"
                    placeholder="Enter your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>
              )}
              <div className="form-group" style={{ marginBottom: '4px' }}>
                <label htmlFor="auth-email">Email Address</label>
                <input
                  id="auth-email"
                  type="email"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="form-group" style={{ marginBottom: '4px' }}>
                <label htmlFor="auth-password">Password</label>
                <input
                  id="auth-password"
                  type="password"
                  placeholder="Min 6 characters"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              <button 
                type="submit" 
                className="auth-form-submit-btn"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <span className="loading-dots" style={{ margin: '0 auto' }}>
                    <span></span><span></span><span></span>
                  </span>
                ) : (
                  authTab === 'login' ? 'Sign In' : 'Register & Get Started'
                )}
              </button>
            </form>

            <div className="auth-modal-footer-hint">
              {authTab === 'login' ? (
                <>
                  New to EduAI? <span onClick={() => handleTabChange('signup')}>Create an account</span>
                </>
              ) : (
                <>
                  Already have an account? <span onClick={() => handleTabChange('login')}>Sign in</span>
                </>
              )}
            </div>

            <button 
              type="button" 
              className="auth-modal-guest-btn" 
              onClick={() => {
                setShowAuthModal(false);
                navigate('/chat');
              }}
            >
              Continue as Guest
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
