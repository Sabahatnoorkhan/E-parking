import React from 'react';
import {
  Modal,
  Box,
  Typography,
  TextField,
  Button,
  IconButton
} from '@mui/material';
import { IParkingInfo } from '../../Interfaces';
import CloseIcon from '@mui/icons-material/Close';

interface IProps {
    open: boolean;
    onClose: () => void;
    onSubmit: (data: Omit<IParkingInfo, 'id' | 'available_slots' | 'owner'>) => void;
    isEditMode: boolean;
    initialData?: IParkingInfo
}

const LocationModal: React.FC<IProps> = ({
  open,
  onClose,
  onSubmit,
  isEditMode,
  initialData
}) => {
  const [locationData, setLocationData] = React.useState<Omit<IParkingInfo, 'id' | 'available_slots' | 'owner'>>({
    name: initialData?.name || '',
    location: initialData?.location || '',
    total_slots: initialData?.total_slots || 0,
    price: initialData?.price || '0',
    latitude: initialData?.latitude || '0',
    longitude: initialData?.longitude || '0'
  });


  const handleChange = (e) => {
    const { name, value } = e.target;
    setLocationData({
      ...locationData,
      [name]: value
    });
  };

  const handleSubmit = () => {
    onSubmit(locationData);
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '500px', // Adjust the width as needed
          bgcolor: 'background.paper',
          borderRadius: '8px',
          boxShadow: 24,
          p: 4,
        }}
      >
        <IconButton
          onClick={onClose}
          sx={{
            position: 'absolute',
            top: 12,
            right: 8,
            color: 'text.secondary'
          }}
        >
          <CloseIcon />
        </IconButton>
        <Typography id="modal-title" variant="h6" component="h2" gutterBottom>
          {isEditMode ? 'Edit Location' : 'Add Location'}
        </Typography>
        <TextField
          label="Location Name"
          name="name"
          fullWidth
          required
          margin="normal"
          value={locationData.name}
          onChange={handleChange}
        />
        <TextField
          label="Address"
          name="address"
          fullWidth
          required
          margin="normal"
          value={locationData.location}
          onChange={handleChange}
        />
        <TextField
          label="Total Slots"
          name="noOfSlots"
          fullWidth
          required
          margin="normal"
          type="number"
          value={locationData.total_slots}
          onChange={handleChange}
        />
        <TextField
          label="Price/Hour"
          name="pricePerHour"
          fullWidth
          required
          margin="normal"
          type="number"
          value={locationData.price}
          onChange={handleChange}
        />
        <TextField
          label="Latitude"
          name="latitude"
          fullWidth
          required
          margin="normal"
          value={locationData.latitude}
          onChange={handleChange}
        />
        <TextField
          label="Longitude"
          name="longitude"
          fullWidth
          required
          margin="normal"
          value={locationData.longitude}
          onChange={handleChange}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleSubmit}
          sx={{ mt: 2 }}
        >
          {isEditMode ? 'Save Changes' : 'Add'}
        </Button>
      </Box>
    </Modal>
  );
};

export default LocationModal;
