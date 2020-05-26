import React from 'react';
import { Nav } from 'react-bootstrap';
import './LoginButton.css'

function LoginButton() {
  return (
    <Nav.Link href="/login">
      Login
    </Nav.Link>  
  )
}

export default LoginButton;