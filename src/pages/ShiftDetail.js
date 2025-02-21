// src/pages/ShiftDetail.js
import React, { useEffect, useState } from 'react';
import { Box, Typography, CircularProgress, Button, Paper, Grid } from '@mui/material';
import { useParams } from 'react-router-dom';
import ShiftService from '../services/shiftService';
import DynamicTable from '../components/DynamicTable';
import employeeService from '../services/employeeService';

const ShiftDetail = () => {
  const { id } = useParams(); // Get the shift ID from the URL parameters
  const [shift, setShift] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [employees, setEmployees] = useState([]);
  const [allEmployees, setAllEmployees] = useState([]); // Sta
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [totalEmployees, setTotalEmployees] = useState(0);
  const [attendance, setAttendance] = useState({});
  

  const fetchShiftDetails = async () => {
    try {
      const { data } = await ShiftService.fetchShiftById(id); // Fetch shift details by ID
      setShift(data.shift);
      setEmployees(data.employees || []); // Assuming the shift data contains an array of employees
      setAttendance(data.attendance || {});
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch shift details');
      setLoading(false);
    }
  };

  const fetchAllEmployees = async () => {
    try {
      const {data, meta} = await employeeService.fetchEmployees(page, rowsPerPage, null); // Fetch all employees
      setAllEmployees(data); // Set the state with the fetched employees
      setTotalEmployees(meta.total)
    } catch (err) {
      console.error('Failed to fetch employees:', err);
    }
  };

  useEffect(() => {
    fetchShiftDetails();
    fetchAllEmployees();
  }, [id, page, rowsPerPage]);

  const handleAssignShift = async (employeeId) => {
    const shiftData = {
      shift_id: parseInt(id),
      start_date: shift.start_time,
      end_date: shift.end_time,
    };

    try {
      await employeeService.assignShift(employeeId, shiftData); // Call the API to assign the shift
      // Optionally, refresh the employee list or show a success message
      console.log(`Shift assigned to employee ${employeeId}`);
      fetchShiftDetails()
    } catch (error) {
      console.error('Failed to assign shift:', error);
    }
  };

  const handleClockIn = async (employeeId) => {
    try {
      await employeeService.clockIn(employeeId, shift.ID); // Call the clock-in API
      console.log(`Employee ${employeeId} clocked in for shift ${shift.ID}`);
      // Optionally refresh the employee list or show a success message
    } catch (error) {
      console.error('Failed to clock in employee:', error);
    }
  };

  const handleClockOut = async (employeeId) => {
    try {
      await employeeService.clockOut(employeeId, shift.ID); // Call the clock-in API
      console.log(`Employee ${employeeId} clocked in for shift ${shift.ID}`);
      // Optionally refresh the employee list or show a success message
    } catch (error) {
      console.error('Failed to clock in employee:', error);
    }
  };

  const calculateHoursWorked = (attendanceDetails) => {
    if (attendanceDetails && attendanceDetails.clock_in_time && attendanceDetails.clock_out_time) {
      const startTime = new Date(attendanceDetails.clock_in_time);
      const endTime = new Date(attendanceDetails.clock_out_time);
      const hoursWorked = (endTime - startTime) / (1000 * 60 * 60); // Convert milliseconds to hours
      return hoursWorked.toFixed(2); // Return hours worked rounded to 2 decimal places
    }
    return 0; // Default to 0 if no attendance data
  };

  const employeeColumns = [
    { id: 'ID', label: 'ID' },
    { id: 'name', label: 'Name' },
    {
      id: 'hours', 
      label: 'Hours', 
      render: (row) => {
        const attendanceDetails = attendance[row.ID];
        return calculateHoursWorked(attendanceDetails);
      }
    },
    {
        id: 'actions',
        label: 'Actions',
        render: (row) => {
            const attendanceDetails = attendance[row.ID];
            if (!attendanceDetails) return null;

            const isPresent = attendanceDetails.status === 'Present';
            const clockInTime = new Date(attendanceDetails.clock_in_time);
            const clockOutTime = new Date(attendanceDetails.clock_out_time);
            
            const now = new Date();
            const isClockedIn = clockInTime <= now;
            const isClockedOut = !!clockOutTime;
            return (
                <div>
                    {!isPresent && (
                    <Button onClick={() => handleClockIn(row.ID)} variant="contained" color="primary">
                      Clock In
                    </Button>
                  )}
                  {isClockedIn && isPresent && !isClockedOut && (
                    <Button onClick={() => handleClockOut(row.ID)} variant="contained" color="secondary">
                      Clock Out
                    </Button>
                  )}
                  
                </div>
            )
        }
    }
  ];


  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) return <Typography color="error">{error}</Typography>;

  return (
    <Box sx={{ padding: 2, height: '85vh', overflow: 'hidden' }}> {/* Prevent outer scrolling */}
      <Typography variant="h4">{shift.name}</Typography>
      <Typography variant="body1">Start Time: {new Date(shift.start_time).toLocaleString()}</Typography>
      <Typography variant="body1">End Time: {new Date(shift.end_time).toLocaleString()}</Typography>

      <Grid container spacing={2} sx={{ mt: 4, height: 'calc(100% - 64px)', overflow: 'hidden' }}> {/* Adjust height based on header */}
        <Grid item xs={6} sx={{ height: '100%', overflowY: 'auto' }}> {/* Enable vertical scrolling */}
          <Paper sx={{ padding: 2, height: '100%' }}>
            <Typography variant="h6">Assigned Employees:</Typography>
            {employees.length === 0 ? (
              <Typography>No employees assigned to this shift.</Typography>
            ) : (
                <DynamicTable 
                data={employees} 
                columns={employeeColumns}
                page={page}
                rowsPerPage={rowsPerPage}
                showPagination={false}
                onRowClick={() => {}}
                />
              
            )}
          </Paper>
        </Grid>

        <Grid item xs={6} sx={{ height: '100%', overflowY: 'auto' }}> {/* Enable vertical scrolling */}
          <Paper sx={{ padding: 2, height: '100%' }}>
            <Typography variant="h6">All Employees:</Typography>
            <DynamicTable 
              data={allEmployees} 
              columns={[
                { id: 'ID', label: 'ID' },
                { id: 'name', label: 'Name' },
                { id: 'email', label: 'Email' },
              ]}
              page={page}
              rowsPerPage={rowsPerPage}
              showPagination={true}
              onPageChange={(event, newPage) => setPage(newPage)}
              onRowsPerPageChange={(event) => {
                setRowsPerPage(parseInt(event.target.value, 10));
                setPage(0);
              }} 
              onRowClick={handleAssignShift}
              totalCount={totalEmployees}
            />
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ShiftDetail;