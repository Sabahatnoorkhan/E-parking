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
  Button
} from '@mui/material';
import { ILocationInfo } from '../../Interfaces/index.ts';
import { mockLocationData } from './mockData.ts';
import BookingModal from './BookingModal.tsx';

const BookParking = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [data, setData] = useState<ILocationInfo[]>(mockLocationData);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const handleButtonClick = (row) => {
    alert(`Button clicked for row with ID: ${row.id}`);
  };

  return (
    <>
    <NavbarComponent/>
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell sx={{ fontWeight: 'bold', width: '20%' }}>Location Name</TableCell>
            <TableCell sx={{ fontWeight: 'bold',  width: '30%' }}>Address</TableCell>
            <TableCell sx={{ fontWeight: 'bold',  width: '15%' }}>Available Slots</TableCell>
            <TableCell sx={{ width: '15%' }}></TableCell>
            <TableCell sx={{ width: '15%' }}></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.name}</TableCell>
              <TableCell>{row.address}</TableCell>
              <TableCell>{row.noOfSlotsAvailable}</TableCell>
              <TableCell><Button
                  variant="contained"
                  color="success"
                  onClick={() => setIsModalOpen(true)}
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
    </TableContainer>
    <BookingModal
        open={isModalOpen}
        handleClose={() => setIsModalOpen(false)}
        locationName="Prefilled Location Name"
      />
    </>
  );
};

export default BookParking;

