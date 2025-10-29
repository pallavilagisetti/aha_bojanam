import React, { createContext, useContext, useState, useEffect } from 'react';
import { login as loginApi, signup as signupApi, logout as logoutApi, getProfile } from '../services/api';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Verify token on mount
    const token = localStorage.getItem('token');
    if (token && user) {
      // Optionally verify token is still valid
      getProfile().catch(() => {
        logoutApi();
        setUser(null);
      });
    }
  }, []);

  const login = async (email, password) => {
    setIsLoading(true);
    try {
      const data = await loginApi({ email, password });
      setUser(data.user);
      return data;
    } catch (error) {
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (name, email, password) => {
    setIsLoading(true);
    try {
      const data = await signupApi({ name, email, password });
      return data;
    } catch (error) {
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    logoutApi();
    setUser(null);
  };

  const isAuthenticated = !!user;
  const isAdmin = user?.role === 'admin' || user?.email?.toLowerCase() === 'pallavilagisetti2003@gmail.com';

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        register,
        logout,
        isAuthenticated,
        isAdmin,
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};


