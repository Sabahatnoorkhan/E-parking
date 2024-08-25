import React from 'react';
import { Navbar, Nav, Button, Container } from 'react-bootstrap';

const NavbarComponent = () => {
  return (
    <Navbar bg="primary" className="fixed-top" data-bs-theme="dark" expand="lg">
      <Container>
        <Navbar.Brand href="#home">Car Parking</Navbar.Brand>
        <Nav className="ml-auto">
          <Nav.Link href="/ownerLocations">Owner Locations</Nav.Link>
          <Nav.Link href="/bookParking">Book Parking</Nav.Link>
          <Nav.Link href="/bookingHistory">Booking History</Nav.Link>
          <Button variant="danger" style={{ marginLeft: '8px' }}>Logout</Button>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default NavbarComponent;