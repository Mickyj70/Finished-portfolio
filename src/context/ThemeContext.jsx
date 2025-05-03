import { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

import PropTypes from 'prop-types';

export const ThemeProvider = ({ children }) => {

ThemeProvider.propTypes = {
  children: PropTypes.node.isRequired
};
  const [theme, setTheme] = useState(() => {
    // Check if theme is stored in localStorage
    const savedTheme = localStorage.getItem('theme');
    return savedTheme || 'dark'; // Default to dark theme
  });

  useEffect(() => {
    // Save theme to localStorage when it changes
    localStorage.setItem('theme', theme);
    
    // Apply theme class to body
    document.body.className = '';
    document.body.classList.add(`theme-${theme}`);
  }, [theme]);

  const toggleTheme = (newTheme) => {
    setTheme(newTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);