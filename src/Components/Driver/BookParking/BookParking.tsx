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
  Button,
  Box,
  Typography,
} from "@mui/material";
import { IParkingInfo, PageState } from "../../../Interfaces/index.ts";
import BookingModal from "./BookingModal.tsx";
import ErrorPage from "../../ErrorState.tsx";
import LoaderPage from "../../LoadingState.tsx";
import EmptyState from "../../EmptyState.tsx";
import * as getAllParkingsAPI from "../../../APIs/parking.ts";
import LocationMapModal from "./LocationMapModal.tsx";
import { toast } from "react-toastify";
import { Spinner } from "react-bootstrap";

const BookParking = () => {
  const [pageState, setPageState] = useState<PageState>("Initial");
  const [data, setData] = useState<IParkingInfo[]>([]);
  const [isLocating, setIsLocating] = useState(false);
  const [locatingId, setLocatingId] = useState('');
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedParking, setSelectedParking] = useState<IParkingInfo>();
  const [isMapModalOpen, setIsMapModalOpen] = useState<boolean>(false); // State to control map modal
  const [mapLocation, setMapLocation] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);
  const [currentLocation, setCurrentLocation] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);

  const handleLocateClick = (latitude: number, longitude: number, id: string) => {
    setIsLocating(true);
    setLocatingId(id);
    setMapLocation({ latitude, longitude });
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setCurrentLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
        setLocatingId('');
        setIsLocating(false);
        setIsMapModalOpen(true);
      },
      () => {
        setLocatingId('');
        setIsLocating(false);
        toast.error("Error getting location");
      }
    );
  };

  const getParkings = () => {
    setPageState("Loading");
    getAllParkingsAPI.GET.service()
      .then(({ data }) => {
        setPageState("Data");
        setData(data);
      })
      .catch(() => {
        setPageState("Error");
      });
  };

  useEffect(() => {
    getParkings();
  }, []);

  return (
    <>
      <NavbarComponent />
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "60px",
        }}
      >
        <Typography variant="h4">Available Locations</Typography>
      </Box>
      {pageState === "Loading" && <LoaderPage />}
      {pageState === "Data" && !data.length && <EmptyState />}
      {pageState === "Error" && <ErrorPage errorHandler={getParkings} />}
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
                <TableCell sx={{ fontWeight: "bold", width: "15%" }}>
                  Available Slots
                </TableCell>
                <TableCell sx={{ fontWeight: "bold", width: "15%" }}>
                  {" "}
                  Price/Hour (£)
                </TableCell>
                <TableCell sx={{ width: "10%" }}></TableCell>
                <TableCell sx={{ width: "10%" }}></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((row) => {
                const {
                  name,
                  location,
                  price,
                  available_slots,
                  id,
                  latitude,
                  longitude,
                } = row;
                return (
                  <TableRow key={id}>
                    <TableCell>{name}</TableCell>
                    <TableCell>{location}</TableCell>
                    <TableCell>{available_slots}</TableCell>
                    <TableCell>{price}</TableCell>
                    <TableCell>
                      <Button
                        variant="contained"
                        color="success"
                        onClick={() => {
                          setSelectedParking(row);
                          setIsModalOpen(true);
                        }}
                        disabled={available_slots < 1}
                      >
                        Book
                      </Button>
                    </TableCell>
                    <TableCell>
                      {isLocating && locatingId === id ? (
                        <div className="d-flex justify-content-center">
                          <Spinner animation="border" variant="primary" />
                        </div>
                      ) : (
                        <Button
                        variant="contained"
                        color="primary"
                        onClick={() =>
                          handleLocateClick(Number(latitude), Number(longitude), id)
                        }
                      >
                        Locate
                      </Button>
                      )}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      )}
      {!!selectedParking && (
        <BookingModal
          open={isModalOpen}
          handleClose={() => setIsModalOpen(false)}
          selectedParking={selectedParking}
          successCallBack={getParkings}
        />
      )}
      {isMapModalOpen && mapLocation && (
        <LocationMapModal
          open={isMapModalOpen}
          onClose={() => setIsMapModalOpen(false)}
          latitude={mapLocation.latitude}
          longitude={mapLocation.longitude}
          currentLatitude={currentLocation?.latitude!}
          currentLongitude={currentLocation?.longitude!}
        />
      )}
    </>
  );
};

export default BookParking;
