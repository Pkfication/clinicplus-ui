// src/components/Sidebar.js
import React, { useState } from 'react';
import { 
  Drawer, 
  List, 
  ListItem, 
  ListItemIcon, 
  ListItemText, 
  Collapse, 
  Typography, 
  Box
} from '@mui/material';
import { 
  People as PeopleIcon, 
  ExpandLess, 
  ExpandMore, 
} from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';

const drawerWidth = 240;

function Sidebar() {
  const [openEmployees, setOpenEmployees] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  const handleEmployeesClick = () => {
    setOpenEmployees(!openEmployees);
  };

  const handleNavigation = (path) => {
    navigate(path);
  };

  // Check if a route is active
  const isActive = (path) => location.pathname === path;

  return (
    <Drawer
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
        },
      }}
      variant="permanent"
      anchor="left"
    >
      <Box 
        sx={{ 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center', 
          padding: 2,
          backgroundColor: 'primary.main',
          color: 'white'
        }}
      >
        <Typography variant="h6">
          ClinicPlus
        </Typography>
      </Box>
      
      <List>
        {/* Employees Section */}
        <ListItem button onClick={handleEmployeesClick}>
          <ListItemIcon>
            <PeopleIcon />
          </ListItemIcon>
          <ListItemText primary="Employees" />
          {openEmployees ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        
        <Collapse in={openEmployees} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItem 
              button 
              sx={{ pl: 4 }}
              selected={isActive('/employees')}
              onClick={() => handleNavigation('/dashboard')}
            >
              <ListItemIcon>
                <PeopleIcon />
              </ListItemIcon>
              <ListItemText primary="List Employees" />
            </ListItem>
          </List>
        </Collapse>
      </List>
    </Drawer>
  );
}

export default Sidebar;