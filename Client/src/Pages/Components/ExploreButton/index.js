import React from 'react';
import { Nav } from 'react-bootstrap';

import './ExploreButton.css'

function ExploreButton() {
  return (
    <Nav.Link href="/results" id = 'exploreButton'>
      Explore
    </Nav.Link>  
  )
}

export default ExploreButton;