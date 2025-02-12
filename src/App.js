// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import EmployeesList from './pages/EmployeesList';
import './App.css';

// Create a theme instance
const theme = createTheme();

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Routes>
        <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard children={<EmployeesList />} />} />
          <Route path="/" element={<Navigate to="/dashboard" />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;