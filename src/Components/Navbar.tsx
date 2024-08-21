import React from 'react';
import { Navbar, Nav, Button, Container } from 'react-bootstrap';

const NavbarComponent = () => {
  return (
    <Navbar bg="primary" data-bs-theme="dark" expand="lg">
      <Container>
        <Navbar.Brand href="#home">Car Parking</Navbar.Brand>
        <Nav className="ml-auto">
          <Button variant="danger">Logout</Button>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default NavbarComponent;