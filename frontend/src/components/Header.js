import React from 'react';
import Logo from '../assets/logo.png'
import { Navbar, Container } from 'react-bootstrap';

const Header = () => {
  return (
    <Navbar bg="light" className='p-0'>
      <Container fluid>
        <Navbar.Brand href="#home" className='ms-5'>
          <img
            src={Logo} //
            width="100"
            height="40"
            className="d-inline-block align-top"
            alt="Logo"
          />
        </Navbar.Brand>
      </Container>
    </Navbar>
  );
}

export default Header;
