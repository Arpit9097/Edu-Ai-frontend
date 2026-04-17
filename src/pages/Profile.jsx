import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';

const Profile = () => {
  const { user } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    cgpa: '',
    graduationYear: '',
    targetDegree: '',
    preferredCountry: '',
    budget: '',
    greScore: ''
  });
  const [msg, setMsg] = useState('');

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
    try {
      await axios.put('/users/profile', formData);
      setMsg('Profile saved successfully! Refresh Dashboard to see updated readiness.');
      setTimeout(() => setMsg(''), 3000);
    } catch (err) {
      setMsg('Failed to save profile');
    }
  };

  return (
    <div id="page-profile">
      <div className="profile-wrap">
        <h2 style={{fontSize: '18px', fontWeight: 500, marginBottom: '16px'}}>My Profile</h2>
        
        <div className="profile-header">
          <div className="profile-avatar">{user?.name ? user.name.substring(0, 2).toUpperCase() : 'ST'}</div>
          <div className="profile-info">
            <h3>{user?.name || 'Student Name'}</h3>
            <p>{formData.targetDegree || 'Target Degree'} · {formData.preferredCountry || 'Preferred Country'}</p>
            <p style={{marginTop: '2px', color: '#5b21b6', fontSize: '12px'}}>✦ Profile {user?.profile?.readiness || 20}% complete</p>
          </div>
        </div>

        <div className="profile-form">
          {msg && <div style={{marginBottom: '10px', fontSize: '13px', color: msg.includes('success') ? 'green' : 'red'}}>{msg}</div>}
          <div className="form-grid">
            <div className="form-group"><label>Full Name</label><input value={user?.name || ''} disabled style={{opacity: 0.7}}/></div>
            <div className="form-group"><label>Email</label><input value={user?.email || ''} disabled style={{opacity: 0.7}}/></div>
            <div className="form-group">
              <label>CGPA</label>
              <input name="cgpa" type="number" step="0.1" value={formData.cgpa} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label>Graduation Year</label>
              <input name="graduationYear" type="number" value={formData.graduationYear} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label>Target Degree</label>
              <select name="targetDegree" value={formData.targetDegree} onChange={handleChange}>
                <option value="">Select Degree</option>
                <option value="MS in Computer Science">MS in Computer Science</option>
                <option value="MBA">MBA</option>
                <option value="MEng">MEng</option>
              </select>
            </div>
            <div className="form-group">
              <label>Preferred Country</label>
              <select name="preferredCountry" value={formData.preferredCountry} onChange={handleChange}>
                <option value="">Select Country</option>
                <option value="USA">USA</option>
                <option value="Canada">Canada</option>
                <option value="Germany">Germany</option>
                <option value="UK">UK</option>
              </select>
            </div>
            <div className="form-group">
              <label>Budget (INR)</label>
              <input name="budget" type="number" value={formData.budget} onChange={handleChange} placeholder="E.g. 4000000" />
            </div>
            <div className="form-group">
              <label>GRE Score</label>
              <input name="greScore" type="number" value={formData.greScore} onChange={handleChange} placeholder="Not added yet" />
            </div>
          </div>
          <button className="save-btn" onClick={handleSave}>Save changes</button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
