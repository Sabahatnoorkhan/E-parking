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
  Button,
  Box,
  Typography
} from '@mui/material';
import { ILocationInfo, PageState } from '../../../Interfaces/index.ts';
import { mockLocationData } from './mockData.ts';
import BookingModal from './BookingModal.tsx';
import ErrorPage from '../../ErrorState.tsx';
import LoaderPage from '../../LoadingState.tsx';
import EmptyState from '../../EmptyState.tsx';

const BookParking = () => {
  const [pageState, setPageState] = useState<PageState>('Data');
  const [data, setData] = useState<ILocationInfo[]>(mockLocationData);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedParking, setSelectedParking] = useState<ILocationInfo>()

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
      <Typography variant="h4">Available Locations</Typography>
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
            <TableCell sx={{ fontWeight: 'bold',  width: '15%' }}>Available Slots</TableCell>
            <TableCell sx={{ fontWeight: 'bold',  width: '15%' }}> Price/Hour (£)</TableCell>
            <TableCell sx={{ width: '10%' }}></TableCell>
            <TableCell sx={{ width: '10%' }}></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.name}</TableCell>
              <TableCell>{row.address}</TableCell>
              <TableCell>{row.noOfSlotsAvailable}</TableCell>
              <TableCell>{row.pricePerHour}</TableCell>
              <TableCell><Button
                  variant="contained"
                  color="success"
                  onClick={() => {
                    setSelectedParking(row)
                    setIsModalOpen(true)}}
                  disabled={row.noOfSlotsAvailable < 1}
                >
                  Book
                </Button></TableCell>
              <TableCell><Button
                  variant="contained"
                  color="primary"
                  onClick={() => handleButtonClick(row)}
                >
                  Locate
                </Button></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>}
    <BookingModal
        open={isModalOpen}
        handleClose={() => setIsModalOpen(false)}
        locationName={selectedParking?.name || ''}
        slotNumber={selectedParking?.noOfSlotsAvailable || 0}
      />
    </>
  );
};

export default BookParking;

