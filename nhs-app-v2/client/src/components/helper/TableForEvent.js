import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';

//table: [{beginTime, endTime, date, location, spots}]
export default function TableForEvent({table}) {
    const rows = table

    return (
    <TableContainer component={Paper}>
      <Table aria-label="table">
        <TableHead>
          <TableRow>
            <TableCell>Times</TableCell>
            <TableCell align="right">Date</TableCell>
            <TableCell align="right">Location</TableCell>
            <TableCell align="right">Spots</TableCell>
            <TableCell align="right"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, index) => (
            <TableRow
              key= {index}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
            
              <TableCell scope="row">{row.beginTime} to {row.endTime}</TableCell>
              <TableCell align="right">{row.date}</TableCell>
              <TableCell align="right">{row.location}</TableCell>
              <TableCell align="right">{row.spots}</TableCell>
              <TableCell align="right">
                  <Button>Sign Up</Button>
              </TableCell>
            </TableRow>
            
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}