import React, { useState } from "react";
import CloseIcon from '@mui/icons-material/Close';
import { Modal, Box, TextField, Button, Typography, IconButton } from "@mui/material";

const BookingModal = ({ open, handleClose, locationName }) => {
  const [formData, setFormData] = useState({
    driverName: "",
    carNumber: "",
    fromTime: "",
    totalHours: "",
    description: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    console.log(formData);
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: "background.paper",
          border: "2px solid #000",
          boxShadow: 24,
          p: 4,
        }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h6" component="div" sx={{ mb: 1 }}>
          <Typography variant="body1" component="span">
            Location:
          </Typography>
          <Typography
            variant="body1"
            component="span"
            sx={{ fontWeight: "bold", color: "blue" }}
          >
            {` ${locationName}`}{" "}
          </Typography>
        </Typography>
          <IconButton onClick={handleClose} color="error">
            <CloseIcon />
          </IconButton>
        </Box>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            margin="normal"
            label="Driver Name"
            name="driverName"
            value={formData.driverName}
            onChange={handleChange}
            required
          />
          <TextField
            fullWidth
            margin="normal"
            label="Car Number"
            name="carNumber"
            value={formData.carNumber}
            onChange={handleChange}
            required
          />
          <TextField
            fullWidth
            margin="normal"
            label="From Time"
            type="datetime-local"
            name="fromTime"
            value={formData.fromTime}
            onChange={handleChange}
            InputLabelProps={{ shrink: true }}
            required
          />
          <TextField
            fullWidth
            margin="normal"
            label="Total Hours"
            type="number"
            name="totalHours"
            value={formData.totalHours}
            onChange={handleChange}
            required
          />
          <TextField
            fullWidth
            margin="normal"
            label="Description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            multiline
            rows={4}
          />
          <Button type="submit" variant="contained" color="primary" sx={{ mt: 1 }}>
            Submit
          </Button>
        </form>
      </Box>
    </Modal>
  );
};

export default BookingModal;
