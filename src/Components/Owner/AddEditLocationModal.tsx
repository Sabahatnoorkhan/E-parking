import React from "react";
import {
  Modal,
  Box,
  Typography,
  TextField,
  Button,
  IconButton,
} from "@mui/material";
import { IParkingInfo } from "../../Interfaces";
import CloseIcon from "@mui/icons-material/Close";
import * as parkingsAPI from "../../APIs/parking.ts";
import { useAuth } from "../../AuthContext.tsx";
import { toast } from "react-toastify";
import { Spinner } from "react-bootstrap";

interface IProps {
  open: boolean;
  onClose: () => void;
  successCallBack: () => void;
  isEditMode: boolean;
  initialData?: IParkingInfo;
}

const LocationModal: React.FC<IProps> = ({
  open,
  onClose,
  isEditMode,
  initialData,
  successCallBack,
}) => {
  const { user } = useAuth();
  const [isAddingOrEditing, setIsAddingOrEditing] = React.useState(false);
  const [locationData, setLocationData] = React.useState<
    Omit<IParkingInfo, "id" | "available_slots" | "owner">
  >({
    name: initialData?.name || "",
    location: initialData?.location || "",
    total_slots: initialData?.total_slots || 1,
    price: initialData?.price || 1,
    latitude: initialData?.latitude || 0,
    longitude: initialData?.longitude || 0,
  });

  const addParking = () => {
    setIsAddingOrEditing(true);
    parkingsAPI.POST.service({
      ...locationData,
      owner: user?.user_id!,
      available_slots: locationData.total_slots,
    })
      .then(() => {
        toast.success("Successfully added the parking");
        setIsAddingOrEditing(false);
        onClose();
        successCallBack();
      })
      .catch(() => {
        toast.error("Something went wrong");
        setIsAddingOrEditing(false);
      });
  };

  const updateParking = () => {
    setIsAddingOrEditing(true);
    parkingsAPI.PUT.service(
      {
        ...locationData,
        owner: user?.user_id!,
      },
      initialData?.id || ""
    )
      .then(() => {
        toast.success("Successfully updating the parking");
        setIsAddingOrEditing(false);
        onClose();
        successCallBack();
      })
      .catch(() => {
        toast.error("Something went wrong");
        setIsAddingOrEditing(false);
      });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLocationData({
      ...locationData,
      [name]: value,
    });
  };

  const handleSubmit = () => {
    if (isEditMode) {
      updateParking();
    } else {
      addParking();
    }
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
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "500px", // Adjust the width as needed
          bgcolor: "background.paper",
          borderRadius: "8px",
          boxShadow: 24,
          p: 4,
        }}
      >
        <IconButton
          onClick={onClose}
          sx={{
            position: "absolute",
            top: 12,
            right: 8,
            color: "text.secondary",
          }}
        >
          <CloseIcon />
        </IconButton>
        <Typography id="modal-title" variant="h6" component="h2" gutterBottom>
          {isEditMode ? "Edit Location" : "Add Location"}
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
          name="location"
          fullWidth
          required
          margin="normal"
          value={locationData.location}
          onChange={handleChange}
        />
        <TextField
          label="Total Slots"
          name="total_slots"
          fullWidth
          required
          margin="normal"
          type="number"
          value={locationData.total_slots}
          onChange={handleChange}
          inputProps={{ min: 1 }}
          error={locationData.total_slots < 1}
          helperText={
            locationData.total_slots < 1 ? "Total slots cannot be less than 1" : ""
          }
        />
        <TextField
          label="Price/Hour"
          name="price"
          fullWidth
          required
          margin="normal"
          type="number"
          value={locationData.price}
          onChange={handleChange}
          inputProps={{ min: 1 }}
          error={locationData.price < 1}
          helperText={locationData.price < 0 ? "Price cannot be less than 1 pound" : ""}
        />

        <TextField
          label="Latitude"
          name="latitude"
          fullWidth
          required
          type="number"
          margin="normal"
          value={locationData.latitude}
          onChange={handleChange}
        />
        <TextField
          label="Longitude"
          name="longitude"
          fullWidth
          required
          type="number"
          margin="normal"
          value={locationData.longitude}
          onChange={handleChange}
        />
        {isAddingOrEditing ? (
          <div className="d-flex justify-content-center mb-4">
            <Spinner animation="border" variant="primary" />
          </div>
        ) : (
          <Button
            variant="contained"
            color="primary"
            onClick={handleSubmit}
            sx={{ mt: 2 }}
          >
            {isEditMode ? "Save Changes" : "Add"}
          </Button>
        )}
      </Box>
    </Modal>
  );
};

export default LocationModal;
