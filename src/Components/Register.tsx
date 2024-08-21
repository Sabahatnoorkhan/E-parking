import React, { useState } from 'react';
import { Container, Form, Button } from 'react-bootstrap';

const Register = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [role, setRole] = useState('Driver'); // Default role
  
    const handleSubmit = (e) => {
      e.preventDefault();
      // Handle form submission logic here
    };
  
    return (
      <Container className="d-flex flex-column justify-content-center align-items-center vh-100">
        <div className="text-center mb-4">
          <h1 className="heading">Car Parking</h1>
        </div>
        <Form className="p-4 p-md-5 border rounded-3 bg-light" onSubmit={handleSubmit}>
          <h2 className="text-center mb-4">Register</h2>
  
          <Form.Group controlId="formFirstName" className="mb-3">
            <Form.Label>First Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter first name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
          </Form.Group>
  
          <Form.Group controlId="formLastName" className="mb-3">
            <Form.Label>Last Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter last name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
            />
          </Form.Group>
  
          <Form.Group controlId="formEmail" className="mb-3">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </Form.Group>
  
          <Form.Group controlId="formPassword" className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </Form.Group>
  
          <Form.Group controlId="formConfirmPassword" className="mb-3">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </Form.Group>
  
          <Form.Group controlId="formRole" className="mb-3">
            <Form.Label>Role</Form.Label>
            <Form.Control
              as="select"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              required
            >
              <option value="Owner">Owner</option>
              <option value="Driver">Driver</option>
            </Form.Control>
          </Form.Group>
  
          <Button variant="primary" type="submit" className="w-100 mb-3">
            Register
          </Button>
  
          <div className="text-center">
            <a href="/login" className="text-decoration-none">
              Already have an account? Login here
            </a>
          </div>
        </Form>
      </Container>
    );
  };

export default Register;
