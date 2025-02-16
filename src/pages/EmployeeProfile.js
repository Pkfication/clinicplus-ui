// src/pages/EmployeeProfile.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import employeeService from '../services/employeeService'; // Adjust the import based on your service location
import { Box, Typography,  Card, CardContent, CircularProgress, Avatar, Tabs, Tab } from '@mui/material';

const EmployeeProfile = () => {
    const { id } = useParams();
    const [employee, setEmployee] = useState(null);
    const [loading, setLoading] = useState(true);
    const [value, setValue] = React.useState(0);

    useEffect(() => {
        const fetchEmployee = async () => {
            try {
                const data = await employeeService.getEmployeeById(id);
                setEmployee(data);
            } catch (error) {
                console.error('Error fetching employee data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchEmployee();
    }, [id]);

    if (loading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <CircularProgress />
            </Box>
        );
    }

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const getInitials = (name) => {
        const names = name.split(' ');
        return names.map(n => n.charAt(0).toUpperCase()).join('');
    };

    return (
        <Card sx={{ margin: 'auto' }}>
          <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Avatar sx={{ bgcolor: 'primary.main', width: 80, height: 80, marginRight: 2 }}>
                        {getInitials(employee.name)} {/* Display initials */}
                    </Avatar>
                    <Typography variant="h4" gutterBottom sx={{ display: 'flex', alignItems: 'center', mb: 0 }}>
                        {employee.name}'s Profile
                    </Typography>
                </Box>
            
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <Tabs value={value} onChange={handleChange} aria-label="profile tabs">
                <Tab label="About" />
                {/* <Tab label="Work Type & Shift" /> */}
                <Tab label="Attendance" />
                <Tab label="Leave" />
                <Tab label="Payroll" />
                {/* <Tab label="Allowance & Deduction" />
                <Tab label="Assets" />
                <Tab label="Performance" />
                <Tab label="Documents" /> */}
              </Tabs>
            </Box>
    
            {value === 0 && (
              <Box sx={{ mt: 3 }}>
                <Typography variant="h6">Personal Information</Typography>
                <Typography variant="body1"><strong>Date of Birth:</strong> {new Date(employee.date_of_birth).toLocaleDateString()}</Typography>
                <Typography variant="body1"><strong>Gender:</strong> {employee.gender}</Typography>
                <Typography variant="body1"><strong>Address:</strong> {employee.address}</Typography>
                <Typography variant="body1"><strong>Country:</strong> {employee.country}</Typography>
                <Typography variant="body1"><strong>State:</strong> {employee.state}</Typography>
    
                <Typography variant="h6" sx={{ mt: 3 }}>Work Information</Typography>
                <Typography variant="body1"><strong>Job Position:</strong> {employee.job_position}</Typography>
                <Typography variant="body1"><strong>Work Type:</strong> {employee.work_type}</Typography>
                <Typography variant="body1"><strong>Salary:</strong> ${employee.salary}</Typography>
                <Typography variant="body1"><strong>Company:</strong> {employee.company}</Typography>
              </Box>
            )}
    
            {value === 1 && (
              <Box sx={{ mt: 3 }}>
                <Typography variant="h6">Work Type & Shift Information</Typography>
                {/* Add Work Type & Shift related information here */}
              </Box>
            )}
          </CardContent>
        </Card>
      );
};

export default EmployeeProfile;
