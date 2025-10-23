import React, { createContext, useContext, useState, useEffect } from 'react';
import { MD3LightTheme, MD3DarkTheme } from 'react-native-paper';
import { StorageUtils } from '../utils/storage';

export type ThemeMode = 'light' | 'dark';

interface ThemeContextType {
  theme: typeof MD3LightTheme;
  themeMode: ThemeMode;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [themeMode, setThemeMode] = useState<ThemeMode>(() => {
    return StorageUtils.loadThemeMode() as ThemeMode;
  });

  const theme = themeMode === 'dark' ? MD3DarkTheme : MD3LightTheme;

  const toggleTheme = () => {
    const newTheme = themeMode === 'light' ? 'dark' : 'light';
    setThemeMode(newTheme);
    StorageUtils.saveThemeMode(newTheme);
  };

  useEffect(() => {
    const savedTheme = StorageUtils.loadThemeMode() as ThemeMode;
    if (savedTheme && savedTheme !== themeMode) {
      setThemeMode(savedTheme);
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <ThemeContext.Provider value={{ theme, themeMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
