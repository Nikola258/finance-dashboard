import { createTheme } from '@mui/material/styles';

// Color palette
const colors = {
  primary: {
    100: '#d0e1ff',
    200: '#a0c4ff',
    300: '#70a6ff',
    400: '#4089ff',
    500: '#106cff',
    600: '#0057cc',
    700: '#004099',
    800: '#002a66',
    900: '#001533',
  },
  secondary: {
    100: '#d6faff',
    200: '#adf5ff',
    300: '#85f1ff',
    400: '#5cecff',
    500: '#33e8ff',
    600: '#29b9cc',
    700: '#1f8b99',
    800: '#155c66',
    900: '#0a2e33',
  },
  grey: {
    100: '#f1f5f9',
    200: '#e2e8f0',
    300: '#cbd5e1',
    400: '#94a3b8',
    500: '#64748b',
    600: '#475569',
    700: '#334155',
    800: '#1e293b',
    900: '#0f172a',
  },
  success: {
    100: '#dcfce7',
    500: '#22c55e',
    900: '#14532d',
  },
  warning: {
    100: '#fef9c3',
    500: '#eab308',
    900: '#713f12',
  },
  error: {
    100: '#fee2e2',
    500: '#ef4444',
    900: '#7f1d1d',
  },
};

// Theme configuration
export const themeSettings = (mode) => {
  return {
    palette: {
      mode: mode,
      ...(mode === 'dark'
        ? {
            // Dark mode palette
            primary: {
              main: colors.primary[500],
              dark: colors.primary[700],
              light: colors.primary[300],
            },
            secondary: {
              main: colors.secondary[500],
              dark: colors.secondary[700],
              light: colors.secondary[300],
            },
            background: {
              default: colors.grey[900],
              paper: colors.grey[800],
            },
            text: {
              primary: colors.grey[100],
              secondary: colors.grey[300],
            },
          }
        : {
            // Light mode palette
            primary: {
              main: colors.primary[500],
              dark: colors.primary[700],
              light: colors.primary[300],
            },
            secondary: {
              main: colors.secondary[500],
              dark: colors.secondary[700],
              light: colors.secondary[300],
            },
            background: {
              default: colors.grey[100],
              paper: '#ffffff',
            },
            text: {
              primary: colors.grey[900],
              secondary: colors.grey[700],
            },
          }),
    },
    typography: {
      fontFamily: ['Inter', 'sans-serif'].join(','),
      fontSize: 12,
      h1: {
        fontFamily: ['Inter', 'sans-serif'].join(','),
        fontSize: 40,
        fontWeight: 600,
      },
      h2: {
        fontFamily: ['Inter', 'sans-serif'].join(','),
        fontSize: 32,
        fontWeight: 600,
      },
      h3: {
        fontFamily: ['Inter', 'sans-serif'].join(','),
        fontSize: 24,
        fontWeight: 600,
      },
      h4: {
        fontFamily: ['Inter', 'sans-serif'].join(','),
        fontSize: 20,
        fontWeight: 600,
      },
      h5: {
        fontFamily: ['Inter', 'sans-serif'].join(','),
        fontSize: 16,
        fontWeight: 600,
      },
      h6: {
        fontFamily: ['Inter', 'sans-serif'].join(','),
        fontSize: 14,
        fontWeight: 600,
      },
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            textTransform: 'none',
            borderRadius: '8px',
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            borderRadius: '12px',
            boxShadow: mode === 'dark' 
              ? '0px 4px 10px rgba(0, 0, 0, 0.5)' 
              : '0px 4px 10px rgba(0, 0, 0, 0.1)',
          },
        },
      },
    },
  };
};

// Create theme function
export const createAppTheme = (mode) => {
  return createTheme(themeSettings(mode));
}; 