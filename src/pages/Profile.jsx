import React, { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';

const Profile = () => {
  const { user, updateProfile } = useContext(AuthContext);
  const [activeTab, setActiveTab] = useState('personal');
  const [formData, setFormData] = useState({
    cgpa: '',
    graduationYear: '',
    targetDegree: '',
    preferredCountry: '',
    budget: '',
    greScore: ''
  });
  const [status, setStatus] = useState({ type: '', message: '' });

  useEffect(() => {
    if (user?.profile) {
      setFormData({
        cgpa: user.profile.cgpa || '',
        graduationYear: user.profile.graduationYear || '',
        targetDegree: user.profile.targetDegree || '',
        preferredCountry: user.profile.preferredCountry || '',
        budget: user.profile.budget || '',
        greScore: user.profile.greScore || ''
      });
    }
  }, [user]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    // Basic Validations
    if (formData.cgpa && (parseFloat(formData.cgpa) < 0 || parseFloat(formData.cgpa) > 10)) {
      setStatus({ type: 'error', message: 'CGPA must be between 0 and 10.' });
      return;
    }
    if (formData.greScore && (parseInt(formData.greScore) < 260 || parseInt(formData.greScore) > 340)) {
      setStatus({ type: 'error', message: 'GRE score must be between 260 and 340.' });
      return;
    }
    if (formData.budget && parseFloat(formData.budget) <= 0) {
      setStatus({ type: 'error', message: 'Budget must be a positive number.' });
      return;
    }

    try {
      await updateProfile(formData);
      setStatus({ type: 'success', message: 'Your profile has been saved and optimized.' });
      setTimeout(() => setStatus({ type: '', message: '' }), 4000);
    } catch (err) {
      setStatus({ type: 'error', message: 'Failed to update profile settings.' });
    }
  };

  return (
    <div id="page-profile">
      <div className="profile-wrap">
        <h2 style={{ fontSize: '24px', fontWeight: 700, letterSpacing: '-0.02em', marginBottom: '8px' }}>My Profile</h2>
        <p style={{ fontSize: '14px', color: 'var(--text-secondary)', marginBottom: '24px' }}>Keep your academic status updated for accurate matching.</p>
        
        {/* Profile Card Header */}
        <div className="profile-header">
          <div className="profile-avatar">{user?.name ? user.name.substring(0, 2).toUpperCase() : 'ST'}</div>
          <div className="profile-info">
            <h3>{user?.name || 'Student Name'}</h3>
            <p style={{ color: 'var(--text-secondary)' }}>{formData.targetDegree || 'Target Degree'} &middot; {formData.preferredCountry || 'Preferred Country'}</p>
            <div style={{ marginTop: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span className="hero-badge" style={{ margin: 0, padding: '3px 10px', fontSize: '11px' }}>
                ✦ {user?.profile?.readiness || 20}% Complete
              </span>
            </div>
          </div>
        </div>

        {/* Tab Selection */}
        <div className="profile-tabs">
          <div className={`profile-tab ${activeTab === 'personal' ? 'active' : ''}`} onClick={() => setActiveTab('personal')}>
            👤 Personal Details
          </div>
          <div className={`profile-tab ${activeTab === 'academic' ? 'active' : ''}`} onClick={() => setActiveTab('academic')}>
            🎓 Academics
          </div>
          <div className={`profile-tab ${activeTab === 'preferences' ? 'active' : ''}`} onClick={() => setActiveTab('preferences')}>
            🌍 Preferences
          </div>
        </div>

        {/* Form Container */}
        <div className="profile-form">
          {status.message && (
            <div className={`alert-box ${status.type}`}>
              <span>{status.type === 'success' ? '✓' : '⚠️'}</span>
              <span>{status.message}</span>
            </div>
          )}

          <div className="form-grid">
            {activeTab === 'personal' && (
              <>
                <div className="form-group">
                  <label>Full Name</label>
                  <input value={user?.name || ''} disabled />
                </div>
                <div className="form-group">
                  <label>Email Address</label>
                  <input value={user?.email || ''} disabled />
                </div>
                <div className="form-group">
                  <label>Graduation Year</label>
                  <input name="graduationYear" type="number" placeholder="e.g. 2026" value={formData.graduationYear} onChange={handleChange} />
                </div>
              </>
            )}

            {activeTab === 'academic' && (
              <>
                <div className="form-group">
                  <label>Undergrad CGPA (Scale of 10)</label>
                  <input name="cgpa" type="number" step="0.01" placeholder="e.g. 8.25" value={formData.cgpa} onChange={handleChange} />
                </div>
                <div className="form-group">
                  <label>Standardized GRE Score (260 - 340)</label>
                  <input name="greScore" type="number" placeholder="e.g. 318" value={formData.greScore} onChange={handleChange} />
                </div>
              </>
            )}

            {activeTab === 'preferences' && (
              <>
                <div className="form-group">
                  <label>Target Degree</label>
                  <select name="targetDegree" value={formData.targetDegree} onChange={handleChange}>
                    <option value="">Select Degree Program</option>
                    <option value="MS in Computer Science">MS in Computer Science</option>
                    <option value="MBA">MBA</option>
                    <option value="MEng">MEng</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Preferred Study Destination</label>
                  <select name="preferredCountry" value={formData.preferredCountry} onChange={handleChange}>
                    <option value="">Select Destination</option>
                    <option value="USA">USA</option>
                    <option value="Canada">Canada</option>
                    <option value="Germany">Germany</option>
                    <option value="UK">UK</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Total Budget (INR)</label>
                  <input name="budget" type="number" placeholder="e.g. 4000000" value={formData.budget} onChange={handleChange} />
                </div>
              </>
            )}
          </div>

          <button className="save-btn" onClick={handleSave}>Save changes</button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
