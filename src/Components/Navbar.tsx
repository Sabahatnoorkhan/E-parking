import React from "react";
import { Navbar, Nav, Button, Container } from "react-bootstrap";
import { useAuth } from "../AuthContext.tsx";
import { useNavigate } from "react-router-dom";

const NavbarComponent = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const loggedInUser = user || JSON.parse(localStorage.getItem('user') || '')

  return (
    <Navbar bg="primary" className="fixed-top" data-bs-theme="dark" expand="lg">
      <Container>
        <Navbar.Brand href="#home">Car Parking</Navbar.Brand>
        <Nav className="ml-auto">
          {loggedInUser?.role === "parking_owner" && (
            <Nav.Link href="/ownerLocations">Owner Locations</Nav.Link>
          )}
          {loggedInUser?.role === "driver" && (
            <>
              <Nav.Link href="/bookParking">Book Parking</Nav.Link>
              <Nav.Link href="/bookingHistory">Booking History</Nav.Link>
              <Nav.Link href="/vehicles">Vehicles</Nav.Link>
            </>
          )}
          <Button
            variant="danger"
            style={{ marginLeft: "8px" }}
            onClick={() => {
              logout();
              navigate("/login");
            }}
          >
            Logout
          </Button>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default NavbarComponent;
