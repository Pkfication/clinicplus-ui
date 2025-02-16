// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Login from './pages/Login';
import Home from './pages/Home';
import EmployeesList from './pages/EmployeesList';
import EmployeeProfile from './pages/EmployeeProfile';
import './App.css';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#90caf9',
    },
    secondary: {
      main: '#f48fb1',
    },
    background: {
      default: '#121212',
      paper: '#1e1e1e',
    },
    text: {
      primary: '#ffffff',
      secondary: '#b3b3b3',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontSize: '2.5rem',
      fontWeight: 500,
      color: '#202124',
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 500,
      color: '#202124',
    },
    h3: {
      fontSize: '1.75rem',
      fontWeight: 500,
      color: '#202124',
    },
    body1: {
      fontSize: '1rem',
      color: '#5F6368',
    },
    button: {
      textTransform: 'none', // Buttons will not be uppercase
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '8px', // Rounded corners for buttons
          padding: '8px 16px', // Consistent padding
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: '12px', // Rounded corners for cards
          boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)', // Subtle shadow
        },
      },
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Home />}>
          <Route path="employees" element={<EmployeesList />} /> {/* Default child route */}
          <Route path="employees/:id" element={<EmployeeProfile />} /> {/* Nested route for EmployeeProfile */}
          <Route index element={<Navigate to="employees" />} /> 
        </Route>
      </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;