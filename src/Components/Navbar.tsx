import React from "react";
import { Navbar, Nav, Button, Container } from "react-bootstrap";
import { useAuth } from "../AuthContext.tsx";
import { useNavigate } from "react-router-dom";

const NavbarComponent = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <Navbar bg="primary" className="fixed-top" data-bs-theme="dark" expand="lg">
      <Container>
        <Navbar.Brand href="#home">Car Parking</Navbar.Brand>
        <Nav className="ml-auto">
          {user?.role === "parking_owner" && (
            <Nav.Link href="/ownerLocations">Owner Locations</Nav.Link>
          )}
          {user?.role === "driver" && (
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
