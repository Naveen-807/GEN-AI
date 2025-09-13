import React, { createContext, useContext, useState, useEffect } from 'react';

interface ThemeContextType {
  isDark: boolean;
  toggleTheme: () => void;
  currentMood: 'calm' | 'stressed' | 'excited' | 'neutral';
  setMood: (mood: 'calm' | 'stressed' | 'excited' | 'neutral') => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isDark, setIsDark] = useState(false);
  const [currentMood, setCurrentMood] = useState<'calm' | 'stressed' | 'excited' | 'neutral'>('neutral');

  useEffect(() => {
    const savedTheme = localStorage.getItem('mindmate-theme');
    if (savedTheme) {
      setIsDark(savedTheme === 'dark');
    }
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light');
    localStorage.setItem('mindmate-theme', isDark ? 'dark' : 'light');
  }, [isDark]);

  const toggleTheme = () => {
    setIsDark(!isDark);
  };

  const setMood = (mood: 'calm' | 'stressed' | 'excited' | 'neutral') => {
    setCurrentMood(mood);
  };

  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme, currentMood, setMood }}>
      {children}
    </ThemeContext.Provider>
  );
};