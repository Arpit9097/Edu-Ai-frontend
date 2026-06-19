import React, { createContext, useMemo, useState, useEffect } from 'react';

export const AuthContext = createContext();

const defaultUser = {
  name: 'Guest Student',
  email: 'guest@eduai.local',
  profile: {
    cgpa: '8.2',
    graduationYear: '2026',
    targetDegree: 'MS in Computer Science',
    preferredCountry: 'USA',
    budget: '4000000',
    greScore: '318',
    readiness: 72
  }
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(defaultUser);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  // Auto-login or load stored credentials on mount
  useEffect(() => {
    const initAuth = async () => {
      const storedToken = localStorage.getItem('eduai_token');
      const storedUser = localStorage.getItem('eduai_user');

      if (storedToken && storedUser) {
        try {
          const parsedUser = JSON.parse(storedUser);
          const profileRes = await fetch('http://localhost:8000/api/profile/', {
            headers: { 'Authorization': `Bearer ${storedToken}` }
          });
          if (profileRes.ok) {
            const profileData = await profileRes.json();
            setToken(storedToken);
            setUser({
              ...parsedUser,
              profile: {
                ...profileData,
                readiness: profileData.completion_percentage || 20
              }
            });
            setLoading(false);
            return;
          }
        } catch (err) {
          console.error("Error loading stored auth session:", err);
        }
      }

      // Guest fallback
      try {
        let loginRes = await fetch('http://localhost:8000/api/auth/login/', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email: 'guest@eduai.local',
            password: 'guestpassword123'
          })
        });

        if (loginRes.status === 400 || loginRes.status === 401) {
          const registerRes = await fetch('http://localhost:8000/api/auth/register/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              email: 'guest@eduai.local',
              password: 'guestpassword123',
              first_name: 'Guest',
              last_name: 'Student'
            })
          });

          if (registerRes.ok) {
            loginRes = await fetch('http://localhost:8000/api/auth/login/', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                email: 'guest@eduai.local',
                password: 'guestpassword123'
              })
            });
          }
        }

        if (loginRes.ok) {
          const data = await loginRes.json();
          setToken(data.access);
          setUser({
            name: 'Guest Student',
            email: 'guest@eduai.local',
            profile: defaultUser.profile
          });
        }
      } catch (err) {
        console.error("Auto authentication failed:", err);
      } finally {
        setLoading(false);
      }
    };

    initAuth();
  }, []);

  const login = async (email, password) => {
    setLoading(true);
    try {
      const res = await fetch('http://localhost:8000/api/auth/login/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      const data = await res.json();
      if (res.ok) {
        setToken(data.access);

        // Fetch User profile data
        const profileRes = await fetch('http://localhost:8000/api/profile/', {
          headers: { 'Authorization': `Bearer ${data.access}` }
        });
        const profileData = await profileRes.json();

        const nameFromEmail = email.split('@')[0];
        const formattedUser = {
          name: nameFromEmail.charAt(0).toUpperCase() + nameFromEmail.slice(1),
          email: email,
          profile: {
            ...profileData,
            readiness: profileData.completion_percentage || 20
          }
        };

        setUser(formattedUser);
        localStorage.setItem('eduai_token', data.access);
        localStorage.setItem('eduai_user', JSON.stringify({ name: formattedUser.name, email: formattedUser.email }));
        return { success: true };
      } else {
        return { success: false, error: data.detail || 'Invalid email or password' };
      }
    } catch (err) {
      console.error(err);
      return { success: false, error: 'Could not connect to authentication server' };
    } finally {
      setLoading(false);
    }
  };

  const register = async (name, email, password) => {
    setLoading(true);
    try {
      const first_name = name.split(' ')[0] || '';
      const last_name = name.split(' ')[1] || '';

      const res = await fetch('http://localhost:8000/api/auth/register/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          password,
          first_name,
          last_name
        })
      });

      const data = await res.json();
      if (res.ok) {
        return await login(email, password);
      } else {
        let errMsg = 'Registration failed';
        if (data.email) errMsg = data.email[0];
        else if (data.password) errMsg = data.password[0];
        return { success: false, error: errMsg };
      }
    } catch (err) {
      console.error(err);
      return { success: false, error: 'Could not connect to registration server' };
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('eduai_token');
    localStorage.removeItem('eduai_user');
    setToken(null);
    setUser(defaultUser);
    window.location.reload();
  };

  const updateProfile = async (profileUpdates) => {
    if (token) {
      try {
        const res = await fetch('http://localhost:8000/api/profile/', {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify(profileUpdates)
        });
        const data = await res.json();
        if (res.ok) {
          setUser((currentUser) => ({
            ...currentUser,
            profile: {
              ...currentUser.profile,
              ...data,
              readiness: data.completion_percentage
            }
          }));
          return { success: true };
        }
      } catch (err) {
        console.error("Failed to update profile on backend database:", err);
      }
    }

    // Fallback React State update
    setUser((currentUser) => {
      const nextProfile = {
        ...currentUser.profile,
        ...profileUpdates
      };
      const profileFields = ['cgpa', 'graduationYear', 'targetDegree', 'preferredCountry', 'budget', 'greScore'];
      const filledFields = profileFields.filter((field) => String(nextProfile[field] || '').trim()).length;

      return {
        ...currentUser,
        profile: {
          ...nextProfile,
          readiness: Math.max(20, Math.min(100, Math.round((filledFields / profileFields.length) * 100)))
        }
      };
    });
  };

  const value = useMemo(() => ({
    user,
    token,
    loading,
    login,
    register,
    logout,
    updateProfile
  }), [user, token, loading]);

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
