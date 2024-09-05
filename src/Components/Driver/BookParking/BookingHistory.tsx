import React, { useState, useEffect } from 'react';
import moment from 'moment';
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
import * as bookingHistoryAPI from '../../../APIs/getDriversBooking.ts'
import { useAuth } from "../../../AuthContext.tsx";
import { getFormattedDate } from '../../../Helpers/index.ts';

const BookingHistory = () => {
  const { user } = useAuth();
  const [pageState, setPageState] = useState<PageState>('Initial');
  const [data, setData] = useState<IDriverBooking[]>([]);

  const getBookingHistory = () => {
    setPageState('Loading');
    bookingHistoryAPI.GET.service(user?.user_id!).then(({data}) => {
      setPageState('Data');
      setData(data);
    }).catch(() => {
      setPageState('Error');
    })
  }

  useEffect(() => {
    getBookingHistory();
  }, [])

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
    {pageState === 'Error' && <ErrorPage errorHandler={getBookingHistory}/>}
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
            const {start_time, end_time, parking_space_object, vehicle_object, id} = row;
            const { plate_number } = vehicle_object;
            const {name, location} = parking_space_object;
            return (
              <TableRow key={id}>
                <TableCell>{name}</TableCell>
                <TableCell>{location}</TableCell>
                <TableCell>{plate_number}</TableCell>
                <TableCell>{getFormattedDate(start_time)}</TableCell>
                <TableCell>{getFormattedDate(end_time)}</TableCell>
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

