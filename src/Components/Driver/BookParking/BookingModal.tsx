import React, { useState } from "react";
import CloseIcon from '@mui/icons-material/Close';
import { Modal, Box, TextField, Button, Typography, IconButton, Select, MenuItem } from "@mui/material";
import { IParkingInfo } from "../../../Interfaces";
import { useAuth } from "../../../AuthContext.tsx";

interface IProps {
  open: boolean;
  handleClose: () => void;
  selectedParking: IParkingInfo
}

const BookingModal: React.FC<IProps> = ({ open, handleClose, selectedParking }) => {
  const {user} =  useAuth();
  const { name, available_slots, id } = selectedParking
  const [formData, setFormData] = useState({
    vehicle: "",
    fromTime: "",
    totalHours: "",
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
    const payload = {
      user: user?.user_id,
      parking_space: id,
      start_time: formData.fromTime,
      end_time: formData.fromTime
    }
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
          width: 500, // Increased width
          bgcolor: "background.paper",
          border: "2px solid #000",
          boxShadow: 24,
          p: 4,
        }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="h6" sx={{fontWeight : 'bold'}} component="div">
            Book Parking Slot
          </Typography>
          <IconButton onClick={handleClose} color="error">
            <CloseIcon />
          </IconButton>
        </Box>

        <Typography variant="body1" component="div" sx={{ mb: 2 }}>
          <Typography variant="body1" component="span">
            Location:
          </Typography>
          <Typography
            variant="body1"
            component="span"
            sx={{ fontWeight: "bold", color: "blue" }}
          >
            {` ${name}`}
          </Typography>
        </Typography>
        <Typography variant="body1" component="div">
          <Typography variant="body1" component="span">
            Slot Number:
          </Typography>
          <Typography
            variant="body1"
            component="span"
            sx={{ fontWeight: "bold", color: "blue" }}
          >
            {` ${available_slots}`}
          </Typography>
        </Typography>
        
        {/* Form Fields */}
        <form onSubmit={handleSubmit}>
        <Select
        labelId="vehicle-select-label"
        value={formData.vehicle}
        onChange={handleChange}
        label="Select Vehicle"
        name="vehicle"
        required
      >
        {vehicles.map((vehicle) => (
          <MenuItem key={vehicle.id} value={vehicle.id}>
            {vehicle.car_model}
          </MenuItem>
        ))}
      </Select>
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
          <Button type="submit" variant="contained" color="primary" sx={{ mt: 1 }}>
            Submit
          </Button>
        </form>
      </Box>
    </Modal>
  );
};

export default BookingModal;
