// Navbar.js
import React, { useEffect, useState } from 'react';
import { Navbar, Nav, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const Menu = () => {
  const navigate = useNavigate();
const [username, setUsername] = useState('');

useEffect(()=>{
    const user = localStorage.getItem('user');
    if(user) {
        const userInfo = JSON.parse(user);
        setUsername(userInfo.user.f_userName)
    } else {
        navigate('/')
    }
},[])
  const handleLogout = () => {
    localStorage.clear();
    navigate('/');
  };

  return (
    <Navbar bg="primary" variant="dark" expand="lg">
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto fw-bold">
          <Nav.Link onClick={() => navigate('/dashboard')} className='px-5'>Home</Nav.Link>
          <Nav.Link onClick={() => navigate('/list')}>Employee List</Nav.Link>
        </Nav>
        <Nav className="fw-bold px-5">
        <Navbar.Text className='px-5'>
            {username}
          </Navbar.Text>
          <Button onClick={handleLogout}>Logout</Button>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Menu;
