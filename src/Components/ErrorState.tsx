import React from "react";
import { Container, Typography, Button, Box } from "@mui/material";
import ErrorIcon from '@mui/icons-material/Error';


const ErrorPage = () => {
  const handleRetry = () => {
    window.location.reload();
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        backgroundColor: "#f5f5f5",
      }}
    >
      <Container maxWidth="sm" sx={{ textAlign: "center" }}>
      <ErrorIcon
        sx={{
          fontSize: 100,
          color: 'error.main',
          marginBottom: '20px',
        }}
      />
        <Typography variant="h4" gutterBottom>
          Oops! Something went wrong.
        </Typography>
        <Typography variant="body1" color="textSecondary" paragraph>
          An error occurred while processing your request. Please try again.
        </Typography>
        <Button variant="contained" color="primary" onClick={handleRetry}>
          Retry
        </Button>
      </Container>
    </Box>
  );
};

export default ErrorPage;
