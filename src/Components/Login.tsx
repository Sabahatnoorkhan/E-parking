import React, { useState } from 'react';
import { Container, Form, Button } from 'react-bootstrap';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Email:', email);
    console.log('Password:', password);
    // Add your login logic here
  };

  return (
    <Container className="d-flex flex-column justify-content-center align-items-center vh-100">
      <div className="text-center mb-4">
        <h1 className="heading">Car Parking</h1>
      </div>
      <Form className="p-4 p-md-5 border rounded-3 bg-light" onSubmit={handleSubmit}>
        <h2 className="text-center mb-4">Login</h2>
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

        <Button variant="primary" type="submit" className="w-100 mb-3">
          Login
        </Button>

        <div className="text-center">
          <a href="/register" className="text-decoration-none">
            Don't have an account? Register here
          </a>
        </div>
      </Form>
    </Container>
  );
}

export default Login;
