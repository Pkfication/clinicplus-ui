import React, { useState, useEffect, useCallback } from 'react';
import { 
  Box, 
  Typography, 
  Fab,
  TextField,
  CircularProgress
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import employeeService from '../services/employeeService';
import Table from '../components/Table';
import AddEmployeeForm from '../components/AddEmployeeForm';
import EditEmployeeForm from '../components/EditEmployeeForm';

function EmployeesList() {
  const [employees, setEmployees] = useState([]);
  const [totalEmployees, setTotalEmployees] = useState(0);
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  const fetchEmployees = useCallback(async () => {
    try {
      const { data, meta } = await employeeService.fetchEmployees(page, rowsPerPage, query);
      console.log(data, meta)
      setEmployees(data);
      setTotalEmployees(meta.total);
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch employees');
      setLoading(false);
    }
  }, [page, rowsPerPage, query]);

  useEffect(() => {
    fetchEmployees();
  }, [fetchEmployees]);

  const handleEditClick = (employee) => {
    setSelectedEmployee(employee);
    setEditDialogOpen(true);
  };

  if (loading) {
    return (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <CircularProgress />
        </Box>
    );
}
  if (error) return <Typography color="error">{error}</Typography>;

  // const displayedEmployees = filteredEmployees.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  return (
    <Box sx={{ width: '100%', overflowX: 'auto' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h5">Employees</Typography>
        <TextField
          variant="outlined"
          placeholder="Search employees..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          sx={{ width: '300px' }} // Adjust width as needed
        />
      </Box>
      <Table 
        employees={employees}
        employeeCount={totalEmployees}
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