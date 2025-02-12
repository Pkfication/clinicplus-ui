// src/pages/EmployeesList.js
import React, { useState, useEffect, useCallback } from 'react';
import { 
  Box, 
  Typography, 
  Fab 
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import employeeService from '../services/employeeService';
import Table from '../components/Table';
import AddEmployeeForm from '../components/AddEmployeeForm';
import EditEmployeeForm from '../components/EditEmployeeForm';

function EmployeesList() {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  const fetchEmployees = useCallback(async () => {
    try {
      const data = await employeeService.fetchEmployees(page, rowsPerPage);
      setEmployees(data);
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch employees');
      setLoading(false);
    }
  }, [page, rowsPerPage]);

  useEffect(() => {
    fetchEmployees();
  }, [fetchEmployees]);

  const handleEditClick = (employee) => {
    setSelectedEmployee(employee);
    setEditDialogOpen(true);
  };

  if (loading) return <Typography>Loading...</Typography>;
  if (error) return <Typography color="error">{error}</Typography>;

  const displayedEmployees = employees.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  return (
    <Box sx={{ width: '100%', overflowX: 'auto' }}>
      <Typography variant="h4" gutterBottom>
        Employees List
      </Typography>
      <Table 
        employees={displayedEmployees} 
        page={page} 
        rowsPerPage={rowsPerPage} 
        onPageChange={(event, newPage) => setPage(newPage)} 
        onRowsPerPageChange={(event) => {
          setRowsPerPage(parseInt(event.target.value, 10));
          setPage(0);
        }} 
        onEditClick={handleEditClick} 
      />
      <Fab 
        color="primary" 
        aria-label="add" 
        sx={{ position: 'fixed', bottom: 16, right: 16 }} 
        onClick={() => setDialogOpen(true)}
      >
        <AddIcon />
      </Fab>
      <AddEmployeeForm 
        open={dialogOpen} 
        onClose={() => setDialogOpen(false)} 
        onEmployeeAdded={fetchEmployees} 
      />
      <EditEmployeeForm 
        open={editDialogOpen} 
        onClose={() => setEditDialogOpen(false)} 
        employee={selectedEmployee} 
      />
    </Box>
  );
}

export default EmployeesList;