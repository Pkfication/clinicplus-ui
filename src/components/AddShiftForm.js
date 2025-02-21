// src/components/AddShiftForm.js
import React, { useState } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button } from '@mui/material';
import ShiftService from '../services/shiftService';

const AddShiftForm = ({ open, onClose, onShiftAdded }) => {
  const [name, setName] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');

  const handleSubmit = async () => {
    const shiftData = {
      name,
      start_time: new Date(startTime).toISOString(),
      end_time: new Date(endTime).toISOString(),
    };

    try {
      await ShiftService.addShift(shiftData);
      onShiftAdded(); // Callback to refresh the shifts list
      onClose(); // Close the dialog
    } catch (error) {
      console.error('Failed to add shift:', error);
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Add Shift</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          label="Shift Name"
          type="text"
          fullWidth
          variant="outlined"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <TextField
          margin="dense"
          label="Start Time"
          type="datetime-local"
          fullWidth
          variant="outlined"
          value={startTime}
          onChange={(e) => setStartTime(e.target.value)}
        />
        <TextField
          margin="dense"
          label="End Time"
          type="datetime-local"
          fullWidth
          variant="outlined"
          value={endTime}
          onChange={(e) => setEndTime(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleSubmit} color="primary">
          Add Shift
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddShiftForm;