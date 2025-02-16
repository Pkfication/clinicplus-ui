// src/pages/Home.js
import React, { useEffect } from 'react';
import { 
  Box, 
  CssBaseline,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import AppBarComponent from '../components/AppBarComponent';
import { Outlet } from 'react-router-dom';

function Home({ children }) {
  const navigate = useNavigate();

  // // Effect to check authentication
  // useEffect(() => {
  //   const checkAuth = () => {
  //     const isAuthenticated = 
  //       localStorage.getItem('isAuthenticated') === 'true' && 
  //       !!localStorage.getItem('token');

  //     if (!isAuthenticated) {
  //       console.log('Not authenticated, redirecting to login');
  //       navigate('/login');
  //     }
  //   };

  //   // Check authentication on mount
  //   checkAuth();
  // }, [navigate]);

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <Sidebar />
      <Box
        component="main"
        sx={{ 
          flexGrow: 1, 
          bgcolor: 'background.default', 
          marginLeft: 0
        }}
      >
        <AppBarComponent title="Employees" />
        <Box
            component="main"
            sx={{ 
            flexGrow: 1, 
            bgcolor: 'background.default', 
            p: 3
            }}
        >
        <Outlet />
        </Box>
      </Box>
    </Box>
  );
}

export default Home;