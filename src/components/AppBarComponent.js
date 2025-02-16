// src/components/AppBarComponent.js
import React from 'react';
import { AppBar, Toolbar, Button, Divider, Breadcrumbs, Link } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';

function AppBarComponent({ title }) {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  // Function to determine breadcrumbs based on the current location
  const getBreadcrumbs = () => {
    const pathParts = location.pathname.split('/').filter(Boolean);
    const breadcrumbs = [];

    if (pathParts.length > 0) {
      breadcrumbs.push(
        <Link key="home" color="inherit" href="/" onClick={(e) => { e.preventDefault(); navigate('/'); }}>
          Home
        </Link>
      );

      pathParts.forEach((part, index) => {
        const route = `/${pathParts.slice(0, index + 1).join('/')}`;
        breadcrumbs.push(
          <Link key={route} color="inherit" href={route} onClick={(e) => { e.preventDefault(); navigate(route); }}>
            {part.charAt(0).toUpperCase() + part.slice(1)}
          </Link>
        );
      });
    }

    return breadcrumbs;
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Breadcrumbs aria-label="breadcrumb" sx={{ flexGrow: 1, ml: 2 }}>
          {getBreadcrumbs()}
        </Breadcrumbs>
        <Divider orientation="vertical" flexItem sx={{ margin: '0 10px' }} />
        <Button color="inherit" onClick={handleLogout}>
          Logout
        </Button>
      </Toolbar>
    </AppBar>
  );
}

export default AppBarComponent;