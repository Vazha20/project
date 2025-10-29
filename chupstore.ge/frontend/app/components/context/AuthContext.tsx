'use client';

import React, { createContext, useState, useEffect, ReactNode, useContext } from 'react';
import axios from 'axios';

interface User {
  id: number;
  username: string;
  email: string;
  role: 'user' | 'admin';
  firstName?: string;
  lastName?: string;
  phone?: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  register: (username: string, email: string, password: string, confirmPassword: string) => Promise<void>;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  login: async () => {},
  register: async () => {},
  logout: () => {},
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) return;

    const fetchProfile = async () => {
      try {
        const res = await axios.get('http://localhost:3001/api/users/profile', {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!res.data.error) setUser(res.data);
        else localStorage.removeItem('token');
      } catch {
        localStorage.removeItem('token');
      }
    };

    fetchProfile();
  }, []);

  const login = async (email: string, password: string) => {
    const res = await axios.post('http://localhost:3001/api/users/login', { email, password });
    if (res.data.error) throw new Error(res.data.error);

    localStorage.setItem('token', res.data.token);
    setUser(res.data.user);
  };

  const register = async (username: string, email: string, password: string, confirmPassword: string) => {
    const res = await axios.post('http://localhost:3001/api/users/register', { username, email, password, confirmPassword });
    if (res.data.error) throw new Error(res.data.error);

    localStorage.setItem('token', res.data.token);
    setUser(res.data.user);
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
