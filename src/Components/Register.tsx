import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { Container, Form, Button, Spinner } from "react-bootstrap";
import "./Register.css"; // Ensure you have this CSS file
import { toast } from "react-toastify";
import { UserRole } from "../Interfaces";
import * as RegisterAPI from "../APIs/register.ts"

const Register = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [licenseNumber, setLicenseNumber] = useState("");
  const [role, setRole] = useState<UserRole>("parking_owner");

  const register = () => {
    setIsLoading(true)
    RegisterAPI.POST.service({username, email, password, licenseNumber, role}).then(() => {
      setIsLoading(false)
      toast.success("Successfully Registered");
      navigate('/login')
    }).catch(() => {
      setIsLoading(false)
      toast.error("Something went wrong")
    })
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    register()
  };

  return (
    <Container
      fluid
      className="register-container d-flex align-items-center justify-content-center"
      style={{ backgroundImage: `url('/CarParking.png')` }}
    >
      <div className="register-form">
        <div className="text-center mb-4">
          <h1 className="heading">E-Parking</h1>
        </div>
        <Form
          className="p-4 p-md-5 border rounded-3 bg-light"
          onSubmit={handleSubmit}
        >
          <h2 className="text-center mb-4">Register</h2>

          <Form.Group controlId="formName" className="mb-3">
            <Form.Label>User Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter your name"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
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

          <Form.Group controlId="formRole" className="mb-3">
            <Form.Label>Role</Form.Label>
            <Form.Control
              as="select"
              value={role}
              onChange={(e) => setRole(e.target.value as UserRole)}
              required
            >
              <option value="parking_owner">Owner</option>
              <option value="driver">Driver</option>
            </Form.Control>
          </Form.Group>

          {role === "driver" && (
            <Form.Group controlId="formLicenseNumber" className="mb-3">
              <Form.Label>License Number</Form.Label>
              <Form.Control
                type="licenseNumber"
                placeholder="License Number"
                value={licenseNumber}
                onChange={(e) => setLicenseNumber(e.target.value)}
                required
              />
            </Form.Group>
          )}

          {isLoading ? (
            <div className="d-flex justify-content-center mb-4">
              <Spinner animation="border" variant="primary" />
            </div>
          ) : (
            <>
              <Button variant="primary" type="submit" className="w-100 mb-3">
                Register
              </Button>

              <div className="text-center">
                <a href="/login" className="text-decoration-none">
                  Already have an account? Login here
                </a>
              </div>
            </>
          )}
        </Form>
      </div>
    </Container>
  );
};

export default Register;
