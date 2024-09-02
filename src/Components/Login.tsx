import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { Container, Form, Button, Spinner } from "react-bootstrap";
import "./Login.css";
import { toast } from "react-toastify";
import { useAuth } from "../AuthContext.tsx";
import * as loginAPI from "../APIs/login.ts";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const loginToPlatform = () => {
    setIsLoading(true);
    loginAPI.POST.service({ username, password })
      .then(({ data }) => {
        const { user_info, access } = data;
        const {role} = user_info
        setIsLoading(false);
        login(access, user_info);

        if(role === 'driver'){
          navigate('/bookParking')
        }
        if(role === 'parking_owner'){
          navigate('/ownerLocations')
        }
      })
      .catch(() => {
        setIsLoading(false);
        toast.error("Invalid email or password");
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    loginToPlatform();
  };

  return (
    <Container
      fluid
      className="login-container vh-100 d-flex align-items-center justify-content-center"
      style={{ backgroundImage: `url('/CarParking.png')` }} // Correct way to reference image in public folder
    >
      <div className="login-form p-4 p-md-5 border rounded-3">
        <div className="text-center mb-4">
          <h1 className="heading">E-Parking</h1>
        </div>
        <h2 className="text-center mb-4">Login</h2>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formEmail" className="mb-3">
            <Form.Label>User name</Form.Label>
            <Form.Control
              disabled={isLoading}
              type="username"
              placeholder="Enter user name"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group controlId="formPassword" className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control
              disabled={isLoading}
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </Form.Group>

          {isLoading ? (
            <div className="d-flex justify-content-center mb-4">
              <Spinner animation="border" variant="primary" />
            </div>
          ) : (
            <>
              <Button variant="primary" type="submit" className="w-100 mb-3">
                Login
              </Button>
              <div className="text-center">
                <a href="/register" className="text-decoration-none">
                  Don't have an account? Register here
                </a>
              </div>
            </>
          )}
        </Form>
      </div>
    </Container>
  );
};

export default Login;
