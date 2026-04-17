import React, { createContext, useMemo, useState } from 'react';

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

  const updateProfile = async (profileUpdates) => {
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
    token: null,
    loading: false,
    login: async () => ({ user }),
    register: async () => ({ user }),
    logout: () => {},
    updateProfile
  }), [user]);

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
