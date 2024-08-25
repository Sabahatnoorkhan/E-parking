import React from 'react';
import { Box, Typography } from '@mui/material';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';

const EmptyState = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        textAlign: 'center',
      }}
    >
       <RemoveCircleOutlineIcon
        sx={{
          fontSize: 100,
          color: 'action.disabled',
          marginBottom: '20px',
        }}
      />
      <Typography variant="h6" color="textSecondary">
        No records are Available !!
      </Typography>
    </Box>
  );
};

export default EmptyState;
