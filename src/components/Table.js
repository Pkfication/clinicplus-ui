// src/components/Table.js
import React from 'react';
import { 
  Table as MuiTable, 
  TableBody, 
  TableHead, 
  TableRow, 
  TableCell, 
  TableContainer, 
  TablePagination, 
  Paper, 
  Button 
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { Link } from 'react-router-dom';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  // backgroundColor: theme.palette.primary.main,
  color: theme.palette.common.white,
  fontWeight: 'bold',
  '&:hover': {
    backgroundColor: theme.palette.primary.dark,
  },
}));

function Table({ employees, page, rowsPerPage, onPageChange, onRowsPerPageChange, onEditClick, employeeCount }) {
  return (
    <Paper>
      <TableContainer>
        <MuiTable>
          <TableHead>
            <TableRow>
              <StyledTableCell>ID</StyledTableCell>
              <StyledTableCell>Name</StyledTableCell>
              <StyledTableCell>Designation</StyledTableCell>
              <StyledTableCell>Salary</StyledTableCell>
              <StyledTableCell>Email</StyledTableCell>
              <StyledTableCell>Phone Number</StyledTableCell>
              <StyledTableCell>Hire Date</StyledTableCell>
              <StyledTableCell>Actions</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {employees.map((employee) => (
              <TableRow key={employee.ID}>
                <TableCell>{employee.ID}</TableCell>
                <TableCell>{employee.name}</TableCell>
                <TableCell>{employee.designation}</TableCell>
                <TableCell>{employee.salary}</TableCell>
                <TableCell>{employee.email}</TableCell>
                <TableCell>{employee.phone_number}</TableCell>
                <TableCell>{employee.hire_date}</TableCell>
                <TableCell>
                  <Button onClick={() => onEditClick(employee)} color="primary">
                    Edit
                  </Button>
                  <Button color="primary">
                    <Link to={`/employees/${employee.ID}`} style={{ textDecoration: 'none', color: 'inherit' }}>View</Link>
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </MuiTable>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={employeeCount}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={onPageChange}
        onRowsPerPageChange={onRowsPerPageChange}
      />
    </Paper>
  );
}

export default Table;