import React, { createContext, useContext, useState } from 'react';
import { translations } from '../utils/translations';

const AppContext = createContext();

export function AppProvider({ children }) {
  const [language, setLanguage] = useState('English');
  const [themeMode, setThemeMode] = useState('dark');

  const t = (key) => {
    return translations[language]?.[key] || translations['English'][key] || key;
  };

  const value = {
    language,
    setLanguage,
    themeMode,
    setThemeMode,
    t
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  return useContext(AppContext);
}
