import React, { useState, useEffect } from "react";
import CloseIcon from "@mui/icons-material/Close";
import {
  Modal,
  Box,
  TextField,
  Button,
  Typography,
  IconButton,
  Select,
  MenuItem,
} from "@mui/material";
import { IParkingInfo, IVehicle, PageState } from "../../../Interfaces";
import { useAuth } from "../../../AuthContext.tsx";
import {
  getDropdownOptions,
  getEndTime,
  getTimeInEpoch,
} from "../../../Helpers/index.ts";
import * as bookParkingAPI from "../../../APIs/bookParking.ts";
import { toast } from "react-toastify";
import * as vehicleAPI from "../../../APIs/driverVehicle.ts";
import { Spinner } from "react-bootstrap";

interface IProps {
  open: boolean;
  handleClose: () => void;
  selectedParking: IParkingInfo;
  successCallBack: () => void;
}

const BookingModal: React.FC<IProps> = ({
  open,
  handleClose,
  selectedParking,
  successCallBack,
}) => {
  const { user } = useAuth();
  const [isBooking, setIsBooking] = useState(false);
  const [getVehicleState, setGetVehicleState] = useState<PageState>("Initial");
  const [vehicles, setVehicles] = useState<IVehicle[]>([]);
  const { name, available_slots, id } = selectedParking;
  const [formData, setFormData] = useState({
    vehicle: "",
    fromTime: "",
    totalHours: 1,
  });

  const getVehicles = () => {
    setGetVehicleState("Loading");
    vehicleAPI.GET.service(user?.user_id!)
      .then(({ data }) => {
        setVehicles(data);
        setGetVehicleState("Data");
      })
      .catch(() => {
        setGetVehicleState("Error");
      });
  };

  useEffect(() => {
    getVehicles();
  }, []);

  const vehicleDropdownData = getDropdownOptions(vehicles);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { fromTime, vehicle, totalHours } = formData;
    const payload = {
      user: user?.user_id!,
      parking_space: id,
      start_time: getTimeInEpoch(fromTime),
      end_time: getEndTime(getTimeInEpoch(fromTime), totalHours),
      vehicle: vehicle,
    };
    setIsBooking(true);
    bookParkingAPI.POST.service(payload)
      .then(() => {
        setIsBooking(false);
        toast.success("Parking booked successfully");
        handleClose();
        successCallBack();
      })
      .catch(() => {
        setIsBooking(false);
        toast.error("Something went wrong");
      });
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
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 2,
          }}
        >
          <Typography variant="h6" sx={{ fontWeight: "bold" }} component="div">
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
          {getVehicleState === "Loading" ? (
            <div className="d-flex justify-content-center mb-4">
              <Spinner animation="border" variant="primary" />
            </div>
          ) : getVehicleState === "Error" ? (
            <Button
              fullWidth
              variant="contained"
              color="error"
              sx={{ mt: 1 }}
              onClick={getVehicles}
            >
              Retry Getting Vehicles
            </Button>
          ) : (
            <Select
              fullWidth
              margin="dense"
              labelId="vehicle-select-label"
              value={formData.vehicle}
              onChange={handleChange}
              label="Select Vehicle"
              name="vehicle"
              required
              sx={{ marginY: "4px" }}
            >
              {vehicleDropdownData.map((vehicle, index) => (
                <MenuItem key={index} value={vehicle.value}>
                  {vehicle.label}
                </MenuItem>
              ))}
            </Select>
          )}
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
            inputProps={{ min: 1 }}
          error={formData.totalHours < 1}
          helperText={
            formData.totalHours < 1 ? "Total hours cannot be less than 1" : ""
          }
          />
          {isBooking ? (
            <div className="d-flex justify-content-center mb-4">
              <Spinner animation="border" variant="primary" />
            </div>
          ) : (
            <Button
              type="submit"
              variant="contained"
              color="primary"
              sx={{ mt: 1 }}
              disabled={
                getVehicleState === "Loading" || getVehicleState === "Error"
              }
            >
              Submit
            </Button>
          )}
        </form>
      </Box>
    </Modal>
  );
};

export default BookingModal;
