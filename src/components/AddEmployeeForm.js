// src/components/AddEmployeeForm.js
import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, MenuItem } from '@mui/material';
import employeeService from '../services/employeeService';

function AddEmployeeForm({ open, onClose, onEmployeeAdded }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [salary, setSalary] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [hireDate, setHireDate] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const employeeData = {
        name,
        email,
        role,
        username,
        password,
        salary: parseFloat(salary), // Convert salary to float
        phone_number: phoneNumber,
        hire_date: hireDate,
      };

      const response = await employeeService.addEmployee(employeeData);

      if (response) {
        console.log('Employee created successfully');
        onEmployeeAdded(); // Fetch all employees again
        onClose(); // Close the dialog after submission
      }
    } catch (error) {
      console.error('Error creating employee:', error);
    }

    // Reset form fields
    setName('');
    setEmail('');
    setRole('');
    setUsername('');
    setPassword('');
    setSalary('');
    setPhoneNumber('');
    setHireDate('');
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Add New Employee</DialogTitle>
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
            label="Username"
            type="text"
            fullWidth
            variant="outlined"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            margin="dense"
            label="Password"
            type="password"
            fullWidth
            variant="outlined"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
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
          Add
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default AddEmployeeForm;