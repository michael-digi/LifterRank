import React from 'react';
import { Button } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import './SignUpButton.css'

function SignUpButton() {
  return (
    <LinkContainer to="/signup" id = 'signUpButton'>
      <Button className = 'navButton shadow-none'>Sign Up</Button>
    </LinkContainer>  
  )
}

export default SignUpButton;