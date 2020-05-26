import React from 'react';
import { Nav } from 'react-bootstrap';
import LoginButton from '../LoginButton';
import SignUpButton from '../SignUpButton';
import './LoginHeader.css'

function LoginHeader() {
  return (
    <Nav id = "loginHeader">
      <div id = 'loginPageNav'>
        <LoginButton />
        <SignUpButton />
      </div>
    </Nav>
  )
}

export default LoginHeader;