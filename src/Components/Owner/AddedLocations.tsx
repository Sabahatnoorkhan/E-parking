import React, { useState, useEffect } from "react";
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
  IParkingInfo,
  LocationModalState,
  PageState,
} from "../../Interfaces/index.ts";
import ErrorPage from "../ErrorState.tsx";
import LoaderPage from "../LoadingState.tsx";
import EmptyState from "../EmptyState.tsx";
import LocationModal from "./AddEditLocationModal.tsx";
import * as myParkingsAPI from "../../APIs/getOwnerParking.ts"
import * as parkingsAPI from "../../APIs/parking.ts"
import { useAuth } from "../../AuthContext.tsx";
import { toast } from "react-toastify";
import { Spinner } from "react-bootstrap";

const OwnerLocation = () => {
  const { user } = useAuth();
  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  const [deleteId, setDeleteId] = useState<string>('')
  const [pageState, setPageState] = useState<PageState>("Initial");
  const [data, setData] = useState<IParkingInfo[]>([]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedLocation, setSelectedLocation] = useState<IParkingInfo>();
  const [modalState, setModalState] = useState<LocationModalState>("Add");

  const getMyParkings = () => {
    setPageState('Loading')
    myParkingsAPI.GET.service(user?.user_id!).then(({data}) => {
      setData(data);
      setPageState('Data');
    }).catch(() => {
      setPageState('Error');
    })
  }

  const deleteParking = (parkingId: string) => {
    setIsDeleting(true);
    setDeleteId(parkingId);
    parkingsAPI.Delete.service(parkingId).then(() => {
      setIsDeleting(false);
      setDeleteId('');
      toast.success('Successfully deleted the parking space');
      getMyParkings();
    }).catch(() => {
      setDeleteId('')
      setIsDeleting(false);
      toast.error('Something went wrong');
    })
  }

  useEffect(() => {
    getMyParkings();
  }, [])

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
      {pageState === "Error" && <ErrorPage errorHandler={getMyParkings} />}
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
              {data.map((row) => {
                const {id, name, location, latitude, longitude, price, total_slots} = row
                return (
                  <TableRow key={id}>
                    <TableCell>{name}</TableCell>
                    <TableCell>{location}</TableCell>
                    <TableCell>{total_slots}</TableCell>
                    <TableCell>{price}</TableCell>
                    <TableCell>{latitude}</TableCell>
                    <TableCell>{longitude}</TableCell>
                    <TableCell>
                      {isDeleting && id === deleteId ? <Spinner animation="border" variant="alert" /> : <DeleteForeverOutlinedIcon sx={{ color: "red" }} onClick={() => deleteParking(id)}/>}
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
                )
              })}
            </TableBody>
          </Table>
        </TableContainer>
      )}
      {isModalOpen && <LocationModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        successCallBack={getMyParkings}
        initialData={selectedLocation}
        isEditMode={modalState === "Edit"}
      />}
    </>
  );
};

export default OwnerLocation;
