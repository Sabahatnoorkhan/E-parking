import React, { useState, useEffect } from "react";
import NavbarComponent from "../../Navbar.tsx";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
  Typography,
  Button,
} from "@mui/material";
import { toast } from "react-toastify";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import { IVehicle, PageState } from "../../../Interfaces/index.ts";
import ErrorPage from "../../ErrorState.tsx";
import LoaderPage from "../../LoadingState.tsx";
import EmptyState from "../../EmptyState.tsx";
import { useAuth } from "../../../AuthContext.tsx";
import AddVehicleModal from "./AddVehicleModal.tsx";
import * as vehicleAPI from "../../../APIs/driverVehicle.ts";
import { Spinner } from "react-bootstrap";

const Vehicles = () => {
  const { user } = useAuth();
  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  const [deleteId, setDeleteId] = useState<string>('')
  const [pageState, setPageState] = useState<PageState>("Initial");
  const [data, setData] = useState<IVehicle[]>([]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const getVehicles = () => {
    setPageState("Loading");
    vehicleAPI.GET.service(user?.user_id!)
      .then(({ data }) => {
        setData(data);
        setPageState("Data");
      })
      .catch(() => {
        setPageState("Error");
      });
  };

  useEffect(() => {
    getVehicles();
  }, []);

  const handleAddVehicleClick = () => {
    setIsModalOpen(true);
  };

  const handleDeleteVehicleClick = (id: string) => {
    setIsDeleting(true);
    setDeleteId(id)
    vehicleAPI.Delete.service(id)
      .then(() => {
        setDeleteId('')
        toast.success("Successfully deleted the vehicle");
        setIsDeleting(false);
        getVehicles();
      })
      .catch(() => {
        setDeleteId('')
        setIsDeleting(false);
        toast.error("Something went wrong");
      });
  };

  return (
    <>
      <NavbarComponent />
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginTop: "60px",
          padding: "0 16px",
        }}
      >
        <Typography variant="h4">Added Vehicle</Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={handleAddVehicleClick}
        >
          Add Vehicle
        </Button>
      </Box>
      {pageState === "Loading" && <LoaderPage />}
      {pageState === "Data" && !data.length && <EmptyState />}
      {pageState === "Error" && <ErrorPage errorHandler={getVehicles} />}
      {pageState === "Data" && data.length && (
        <TableContainer
          component={Paper}
          sx={{ marginTop: "8px", borderTop: "1px solid black" }}
        >
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: "bold", width: "40%" }}>
                  Vehicle Name
                </TableCell>
                <TableCell sx={{ fontWeight: "bold", width: "40%" }}>
                  Vehicle Number
                </TableCell>
                <TableCell sx={{ fontWeight: "bold", width: "20%" }}>
                  Total Slots
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((row) => {
                const { plate_number, car_model, id } = row;
                return (
                  <TableRow key={id}>
                    <TableCell>{car_model}</TableCell>
                    <TableCell>{plate_number}</TableCell>
                    <TableCell>
                    {isDeleting && id === deleteId ? <Spinner animation="border" variant="alert" /> : <DeleteForeverOutlinedIcon
                        sx={{ color: "red" }}
                        onClick={() => handleDeleteVehicleClick(id)}
                      />}
                      
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      )}
      {isModalOpen && (
        <AddVehicleModal
          open={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          successCallback={getVehicles}
        />
      )}
    </>
  );
};

export default Vehicles;
