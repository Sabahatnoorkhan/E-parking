import React, { useState } from "react";
import {
  Modal,
  Box,
  Typography,
  TextField,
  Button,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { IVehicle } from "../../../Interfaces";
import { useAuth } from "../../../AuthContext.tsx";
import * as vehicleAPI from "../../../APIs/driverVehicle.ts";
import { toast } from "react-toastify";
import { Spinner } from "react-bootstrap";

interface IProps {
  open: boolean;
  onClose: () => void;
  successCallback: () => void;
}

const AddVehicleModal: React.FC<IProps> = ({
  open,
  onClose,
  successCallback,
}) => {
  const { user } = useAuth();
  const [isAdding, setIsAdding] = useState<boolean>(false);
  const [vehicleData, setVehicleData] = React.useState<
    Omit<IVehicle, "id" | "user">
  >({
    plate_number: "",
    car_model: "",
  });

  const handleAddingVehicle = () => {
    setIsAdding(true);
    vehicleAPI.POST.service({
      plate_number: vehicleData.plate_number,
      car_model: vehicleData.car_model,
      user: user?.user_id!,
    })
      .then(() => {
        setIsAdding(false);
        toast.success("Vehicle added successfully");
        successCallback();
        onClose();
      })
      .catch(() => {
        setIsAdding(false);
        toast.error("Something went wrong");
      });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setVehicleData({
      ...vehicleData,
      [name]: value,
    });
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
          Add Vehicle
        </Typography>
        <TextField
          label="Car Model"
          name="car_model"
          fullWidth
          required
          margin="normal"
          value={vehicleData.car_model}
          onChange={handleChange}
        />
        <TextField
          label="Car Number"
          name="plate_number"
          fullWidth
          required
          margin="normal"
          value={vehicleData.plate_number}
          onChange={handleChange}
        />
        {isAdding ? (
          <div className="d-flex justify-content-center mb-4">
            <Spinner animation="border" variant="primary" />
          </div>
        ) : (
          <Button
            variant="contained"
            color="primary"
            onClick={handleAddingVehicle}
            sx={{ mt: 2 }}
          >
            Add
          </Button>
        )}
      </Box>
    </Modal>
  );
};

export default AddVehicleModal;
