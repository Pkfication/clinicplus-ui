// src/components/EditEmployeeForm.js
import React, { useState, useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, MenuItem } from '@mui/material';
import employeeService from '../services/employeeService';

function EditEmployeeForm({ open, onClose, employee }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('');
  const [salary, setSalary] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [hireDate, setHireDate] = useState('');

  useEffect(() => {
    if (employee) {
      setName(employee.name);
      setEmail(employee.email);
      setRole(employee.role);
      setSalary(employee.salary);
      setPhoneNumber(employee.phone_number);
      setHireDate(employee.hire_date);
    }
  }, [employee]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const updatedEmployeeData = {
        name,
        email,
        role,
        salary: parseFloat(salary),
        phone_number: phoneNumber,
        hire_date: hireDate,
      };

      const response = await employeeService.updateEmployee(employee.ID, updatedEmployeeData);

      if (response) {
        console.log('Employee updated successfully');
        onClose(); // Close the dialog after submission
      }
    } catch (error) {
      console.error('Error updating employee:', error);
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Edit Employee</DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit}>
          <TextField
            autoFocus
            margin="dense"
            label="Name"
            type="text"
            fullWidth
            variant="outlined"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            margin="dense"
            label="Email"
            type="email"
            fullWidth
            variant="outlined"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            margin="dense"
            label="Role"
            select
            fullWidth
            variant="outlined"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            <MenuItem value="Admin">Admin</MenuItem>
            <MenuItem value="Nurse">Nurse</MenuItem>
            <MenuItem value="Doctor">Doctor</MenuItem>
          </TextField>
          <TextField
            margin="dense"
            label="Salary"
            type="number"
            fullWidth
            variant="outlined"
            value={salary}
            onChange={(e) => setSalary(e.target.value)}
          />
          <TextField
            margin="dense"
            label="Phone Number"
            type="text"
            fullWidth
            variant="outlined"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
          <TextField
            margin="dense"
            label="Hire Date"
            type="date"
            fullWidth
            variant="outlined"
            value={hireDate}
            onChange={(e) => setHireDate(e.target.value)}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleSubmit} color="primary">
          Update
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default EditEmployeeForm;