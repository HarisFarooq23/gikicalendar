
"use client";

import { useState, useEffect, createContext, useContext, useCallback } from 'react';

type AuthState = {
  isLoggedIn: boolean;
  isModerator: boolean;
  login: (isModerator?: boolean) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthState | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isModerator, setIsModerator] = useState(false);

  useEffect(() => {
    // Check local storage for auth state
    const storedIsLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    const storedIsModerator = localStorage.getItem('isModerator') === 'true';
    if (storedIsLoggedIn) {
      setIsLoggedIn(true);
      setIsModerator(storedIsModerator);
    }
  }, []);

  const login = useCallback((isMod = false) => {
    setIsLoggedIn(true);
    setIsModerator(isMod);
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('isModerator', String(isMod));
  }, []);

  const logout = useCallback(() => {
    setIsLoggedIn(false);
    setIsModerator(false);
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('isModerator');
  }, []);

  return (
    <AuthContext.Provider value={{ isLoggedIn, isModerator, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
