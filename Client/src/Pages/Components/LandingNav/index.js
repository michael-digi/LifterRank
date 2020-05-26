import React from 'react';
import { Nav } from 'react-bootstrap';
import ExploreButton from '../ExploreButton';
import LoginButton from '../LoginButton';
import SignUpButton from '../SignUpButton';
import './LandingNav.css'

function LandingNav() {
  return (
      <Nav id = "navDiv">
        <ExploreButton />
        <LoginButton />
        <SignUpButton />
      </Nav>
  )
}

export default LandingNav;