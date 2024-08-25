import React from 'react';
import { CircularProgress, Box } from '@mui/material';

const LoaderPage = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundColor: '#f5f5f5',
      }}
    >
      <CircularProgress size={80} />
    </Box>
  );
};

export default LoaderPage;