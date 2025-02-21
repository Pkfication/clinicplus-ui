// src/pages/Shifts.js
import React, { useEffect, useState, useCallback } from 'react';
import { Button, Box, Typography, TextField,  CircularProgress } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ShiftService from '../services/shiftService'; // Adjust the import based on your service location
import DynamicTable from '../components/DynamicTable'; // Assuming the same table component is used
import AddShiftForm from '../components/AddShiftForm';

const Shifts = () => {
  const [shifts, setShifts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openAddShiftDialog, setOpenAddShiftDialog] = useState(false); // State to control dialog visibility
  const navigate = useNavigate();

  const fetchShifts = useCallback(async () => {
    try {
      const { data } = await ShiftService.fetchShifts(); // Adjust API call for pagination and search
      setShifts(data);
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch shifts');
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchShifts();
  }, [fetchShifts]);

  const handleOpenAddShiftDialog = () => {
    setOpenAddShiftDialog(true);
  };

  const handleCloseAddShiftDialog = () => {
    setOpenAddShiftDialog(false);
  };

  const handleShiftAdded = () => {
    fetchShifts(); // Refresh the shifts list after adding a new shift
  };

  // src/pages/Shifts.js
    const shiftColumns = [
        { id: 'ID', label: 'ID' },
        { id: 'name', label: 'Shift Name' },
        { id: 'start_time', label: 'Start Time' },
        { id: 'end_time', label: 'End Time' },
    ];

    const handleRowClick = (shiftId) => {
        navigate(`/shifts/${shiftId}`); // Navigate to the shift detail page
      };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) return <Typography color="error">{error}</Typography>;

  return (
    <Box sx={{ width: '100%', overflowX: 'auto' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
        <Typography variant="h5">Shifts</Typography>

        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <TextField
                variant="outlined"
                placeholder="Search shifts..."
                size="small"
                slotProps={{
                    input: { sx: { borderRadius: 0 } }
                }}
                sx={{ width: '300px', mr: 2, borderRadius: 0 }} // Adjust width as needed
            />
            <Button 
                variant="contained" 
                color="primary" 
                sx={{borderRadius: 0}}
                onClick={handleOpenAddShiftDialog}
            >
                Create Shift
            </Button>
        </Box>
      </Box>

      {shifts.length == 0 ? (
        <Typography variant="h6" align="center" sx={{ mt: 2 }}>
          Oh oh! No Data available.
        </Typography>
      ) : (
        <DynamicTable 
            data={shifts} 
            columns={shiftColumns}
            employeeCount={shifts.length} // Update to reflect total shifts
            showPagination={false}
            onRowClick={handleRowClick}
        />
      )}

    <AddShiftForm 
        open={openAddShiftDialog} 
        onClose={handleCloseAddShiftDialog} 
        onShiftAdded={handleShiftAdded} 
      />
    </Box>
  );
};

export default Shifts;