import { createTheme } from '@mui/material/styles';

const yourTheme = createTheme({
  palette: {
    primary: {
      main: '#007bff', // Your primary color
    },
    secondary: {
      main: '#ff5722', // Your secondary color
    },
    background: {
      default: '#f0f0f0', // Default background color
    },
  },
  typography: {
    fontFamily: 'Roboto, Arial, sans-serif', // Your preferred font-family
    h1: {
      fontSize: '2rem', // Adjust heading font size
      fontWeight: 'bold', // Heading font weight
      color: '#333', // Heading text color
    },
    body1: {
      fontSize: '1rem', // Default body text font size
      lineHeight: 1.5, // Line height for body text
      color: '#666', // Default body text color
    },
  },
  spacing: 8, // Adjust the spacing between components
  shape: {
    borderRadius: 8, // Adjust the border radius for components
  },
  overrides: {
    MuiButton: {
      // Customize button styles
      root: {
        textTransform: 'none', // Remove button text transformation
      },
    },
  },
});

export default yourTheme;
