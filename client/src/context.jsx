// ThemeContext.js
import { createContext, useState } from 'react';

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [isDarkTheme, setIsDarkTheme] = useState(false); // Tema blanco por defecto

  const toggleTheme = () => {
    setIsDarkTheme((prevTheme) => !prevTheme); // Alterna entre blanco y negro
  };

  return (
    <ThemeContext.Provider value={{ isDarkTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
