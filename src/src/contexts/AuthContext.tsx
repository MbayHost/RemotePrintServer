import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from '../types';

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  updateProfile: (data: Partial<User>) => Promise<void>;
  changePassword: (oldPassword: string, newPassword: string) => Promise<void>;
  checkSubscription: () => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Check for stored session
    const storedUser = localStorage.getItem('printer_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = async (email: string, password: string) => {
    // Simulate API call
    const userData: User = {
      email,
      name: email.split('@')[0],
      nickname: '3936865',
      subscriptionEnd: '2024-11-01T00:00:00.000Z', // Example subscription end date
    };
    setUser(userData);
    localStorage.setItem('printer_user', JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('printer_user');
  };

  const updateProfile = async (data: Partial<User>) => {
    if (!user) return;
    const updatedUser = { ...user, ...data };
    setUser(updatedUser);
    localStorage.setItem('printer_user', JSON.stringify(updatedUser));
  };

  const changePassword = async (oldPassword: string, newPassword: string) => {
    // Simulate API call
    if (oldPassword === 'wrong') {
      throw new Error('Invalid old password');
    }
    // Password changed successfully
    return;
  };

  const checkSubscription = async () => {
    if (!user?.subscriptionEnd) return false;
    return new Date(user.subscriptionEnd) > new Date();
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      login, 
      logout, 
      updateProfile, 
      changePassword, 
      checkSubscription 
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}