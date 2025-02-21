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
import ScheduleIcon from '@mui/icons-material/Schedule'
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
          // backgroundColor: 'background.paper', // Set background color to primary
          // color: 'text.primary'
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
          // backgroundColor: 'background.paper', // Set background color to primary
          // color: 'text.primary' // Set text color to white for visibility
        }}
      >
        <Typography variant="h6">
          ClinicPlus
        </Typography>
      </Box>
      
      <List>
        <ListItem button onClick={() => handleNavigation('/employees')}>
          <ListItemIcon>
            <PeopleIcon />
          </ListItemIcon>
          <ListItemText primary="Employees" />
        </ListItem>

        <ListItem button onClick={() => handleNavigation('/shifts')}>
          <ListItemIcon>
            <ScheduleIcon />
          </ListItemIcon>
        <ListItemText primary="Shifts" />
      </ListItem>
      </List>
    </Drawer>
  );
}

export default Sidebar;