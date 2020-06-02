import React from 'react';
import { Nav } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import './LoginButton.css'

function LoginButton() {
  return (
    <NavLink to="/login" id='loginButton'>
      Login
    </NavLink>  
  )
}

export default LoginButton;