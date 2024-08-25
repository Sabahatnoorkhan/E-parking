import React, { useState } from 'react';

import NavbarComponent from '../Navbar.tsx';
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
import { IBookingHistory, PageState } from '../../Interfaces/index.ts';
import { mockBookingHistory } from './BookParking/mockData.ts';
import LoaderPage from '../LoadingState.tsx';
import EmptyState from '../EmptyState.tsx';
import ErrorPage from '../ErrorState.tsx';

const BookingHistory = () => {
  const [pageState, setPageState] = useState<PageState>('Data');
  const [data, setData] = useState<IBookingHistory[]>(mockBookingHistory);

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
            <TableCell sx={{ fontWeight: 'bold',  width: '15%' }}>Slot Number</TableCell>
            <TableCell sx={{ fontWeight: 'bold',  width: '20%' }}>Booked From</TableCell>
            <TableCell sx={{ fontWeight: 'bold',  width: '15%' }}>Hours of booking</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row) => (
            <TableRow key={row.locationId}>
              <TableCell>{row.locationName}</TableCell>
              <TableCell>{row.address}</TableCell>
              <TableCell>{row.slotNumber}</TableCell>
              <TableCell>{row.bookedFrom}</TableCell>
              <TableCell>{row.totalHourOfBooking}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>}
    </>
  );
};

export default BookingHistory;

