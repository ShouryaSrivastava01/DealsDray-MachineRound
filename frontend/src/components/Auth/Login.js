import React from 'react';
import { useState } from 'react';
import { Container, Button, Row, Col, Form, Alert} from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    if(!username) {
        setError("User name is required") 
        return;
    }
    if(!password) {
        setError("Password is required")
        return;
    }
    const credentials = {
        userName: username,
        password: password,
      };
  
      try {
        const response = await fetch('http://127.0.0.1:3001/signin', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(credentials),
        });
        if (response.ok) {
          const data = await response.json();
          localStorage.setItem('user', JSON.stringify(data));
          navigate('/dashboard')
          setError('');
        } else {
            const message = await response.json();
            setError(message.message)
        }
      } catch (error) {
        console.error('Error:', error);
      }
  };

  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col md={6}>
          <h2 className="text-center my-5">Login</h2>
          <Form onSubmit={handleLogin}>
            <Form.Group as={Row} controlId="formUsername" className="mb-3">
              <Form.Label column sm={3}>
                User Name
              </Form.Label>
              <Col sm={9}>
                <Form.Control
                  type="text"
                  placeholder="Enter username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row} controlId="formPassword" className="mb-3">
              <Form.Label column sm={3}>
                Password
              </Form.Label>
              <Col sm={9}>
                <Form.Control
                  type="password"
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row}>
            <Form.Label column sm={3}>
              </Form.Label>
              <Col sm={9}>
            <Button  variant="success" type="submit" className='w-100'> Login </Button>
              </Col>
            </Form.Group>
  
          </Form>
          {error && (
            <Alert variant="danger" className="mt-3">
              {error}
            </Alert>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
