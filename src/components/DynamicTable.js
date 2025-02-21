// src/components/DynamicTable.js
import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TablePagination } from '@mui/material';
import { styled } from '@mui/material/styles'; // Import styled

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  color: theme.palette.common.white,
  fontWeight: 'bold',
  '&:hover': {
    backgroundColor: theme.palette.action.hover,
  },
}));

function DynamicTable({ data, columns, totalCount, page, rowsPerPage, onPageChange, showPagination, onRowClick }) {
  return (
    <Paper>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <StyledTableCell key={column.id}>{column.label}</StyledTableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((item) => (
              <TableRow key={item.ID} onClick={() => onRowClick(item.ID)} style={{ cursor: 'pointer' }}>
                {columns.map((column) => (
                  <TableCell key={column.id}>
                    {column.render ? column.render(item) : item[column.id]}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {showPagination &&
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={totalCount}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={onPageChange}
        />
      }
    </Paper>
  );
}

export default DynamicTable;