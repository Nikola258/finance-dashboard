import { createContext, useState, useMemo, useContext } from 'react';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { createAppTheme } from '../theme';

// Create context
const ThemeContext = createContext({
  toggleTheme: () => {},
  mode: 'dark',
});

// Custom hook to use the theme context
export const useThemeContext = () => useContext(ThemeContext);

// Theme provider component
export const ThemeProviderWrapper = ({ children }) => {
  const [mode, setMode] = useState('dark');

  // Theme toggle function
  const toggleTheme = () => {
    setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
  };

  // Memoize the theme to prevent unnecessary re-renders
  const theme = useMemo(() => createAppTheme(mode), [mode]);
  
  // Memoize context value
  const contextValue = useMemo(
    () => ({
      toggleTheme,
      mode,
    }),
    [mode]
  );

  return (
    <ThemeContext.Provider value={contextValue}>
      <ThemeProvider theme={theme}>
        <CssBaseline /> {/* Applies baseline styles */}
        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  );
}; 