import React, { useState } from 'react';

import NavbarComponent from '../../Navbar.tsx';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
  Typography,
} from '@mui/material';
import { IDriverBooking, PageState } from '../../../Interfaces/index.ts';
import LoaderPage from '../../LoadingState.tsx';
import EmptyState from '../../EmptyState.tsx';
import ErrorPage from '../../ErrorState.tsx';

const BookingHistory = () => {
  const [pageState, setPageState] = useState<PageState>('Data');
  const [data, setData] = useState<IDriverBooking[]>([]);

  const handleButtonClick = (row) => {
    alert(`Button clicked for row with ID: ${row.id}`);
  };

  return (
    <>
    <NavbarComponent/>
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center', 
        alignItems: 'center',     
        marginTop: '60px'         
      }}
    >
      <Typography variant="h4">Booking History</Typography>
    </Box>
    {pageState === 'Loading' && <LoaderPage/>}
    {pageState === 'Data' && !data.length && <EmptyState/>}
    {pageState === 'Error' && <ErrorPage/>}
    {pageState === 'Data' && data.length && <TableContainer component={Paper} sx={{marginTop: '8px', borderTop: '1px solid black'}}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell sx={{ fontWeight: 'bold', width: '20%' }}>Location Name</TableCell>
            <TableCell sx={{ fontWeight: 'bold',  width: '30%' }}>Address</TableCell>
            <TableCell sx={{ fontWeight: 'bold',  width: '20%' }}>Vehicle Number</TableCell>
            <TableCell sx={{ fontWeight: 'bold',  width: '15%' }}>Booked From</TableCell>
            <TableCell sx={{ fontWeight: 'bold',  width: '15%' }}>End Time</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row) => {
            const {start_time, end_time, parking_space, vehicle, id} = row;
            const { plate_number } = vehicle;
            const {name, location} = parking_space;
            return (
              <TableRow key={id}>
                <TableCell>{name}</TableCell>
                <TableCell>{location}</TableCell>
                <TableCell>{plate_number}</TableCell>
                <TableCell>{start_time}</TableCell>
                <TableCell>{end_time}</TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </TableContainer>}
    </>
  );
};

export default BookingHistory;

