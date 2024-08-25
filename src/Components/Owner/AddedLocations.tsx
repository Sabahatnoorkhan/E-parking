import React, { useState } from "react";
import NavbarComponent from "../Navbar.tsx";
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
  Button
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import {
  IOwnerLocationInfo,
  LocationModalState,
  PageState,
} from "../../Interfaces/index.ts";
import ErrorPage from "../ErrorState.tsx";
import LoaderPage from "../LoadingState.tsx";
import EmptyState from "../EmptyState.tsx";
import { mockOwnerLocation } from "../Driver/BookParking/mockData.ts";
import LocationModal from "./AddEditLocationModal.tsx";

const OwnerLocation = () => {
  const [pageState, setPageState] = useState<PageState>("Data");
  const [data, setData] = useState<IOwnerLocationInfo[]>(mockOwnerLocation);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedLocation, setSelectedLocation] = useState<IOwnerLocationInfo>();
  const [modalState, setModalState] = useState<LocationModalState>("Add");

  const handleOnSubmit = (location: Omit<IOwnerLocationInfo, "id">) => {
    alert(`Button clicked for row with ID: ${location.name}`);
  };

  const handleAddLocationClick = () => {
    setModalState('Add');
    setSelectedLocation(undefined);
    setIsModalOpen(true);
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
        <Typography variant="h4">Added Locations</Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={handleAddLocationClick}
        >
          Add Location
        </Button>
      </Box>
      {pageState === "Loading" && <LoaderPage />}
      {pageState === "Data" && !data.length && <EmptyState />}
      {pageState === "Error" && <ErrorPage />}
      {pageState === "Data" && data.length && (
        <TableContainer
          component={Paper}
          sx={{ marginTop: "8px", borderTop: "1px solid black" }}
        >
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: "bold", width: "20%" }}>
                  Location Name
                </TableCell>
                <TableCell sx={{ fontWeight: "bold", width: "30%" }}>
                  Address
                </TableCell>
                <TableCell sx={{ fontWeight: "bold", width: "10%" }}>
                  Total Slots
                </TableCell>
                <TableCell sx={{ fontWeight: "bold", width: "10%" }}>
                  Price/Hour (£)
                </TableCell>
                <TableCell sx={{ fontWeight: "bold", width: "10%" }}>
                  Latitude
                </TableCell>
                <TableCell sx={{ fontWeight: "bold", width: "10%" }}>
                  Longitude
                </TableCell>
                <TableCell sx={{ width: "5%" }}></TableCell>
                <TableCell sx={{ width: "5%" }}></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((row) => (
                <TableRow key={row.id}>
                  <TableCell>{row.name}</TableCell>
                  <TableCell>{row.address}</TableCell>
                  <TableCell>{row.noOfSlots}</TableCell>
                  <TableCell>{row.pricePerHour}</TableCell>
                  <TableCell>{row.latitude}</TableCell>
                  <TableCell>{row.longitude}</TableCell>
                  <TableCell>
                    <DeleteForeverOutlinedIcon sx={{ color: "red" }} />
                  </TableCell>
                  <TableCell>
                    <EditIcon
                      sx={{ color: "green" }}
                      onClick={() => {
                        setSelectedLocation(row);
                        setModalState('Edit');
                        setIsModalOpen(true);
                      }}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
      {isModalOpen && <LocationModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleOnSubmit}
        initialData={selectedLocation}
        isEditMode={modalState === "Edit"}
      />}
    </>
  );
};

export default OwnerLocation;
