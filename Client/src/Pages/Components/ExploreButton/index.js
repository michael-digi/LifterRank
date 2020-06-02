import React from 'react';
import { Nav } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import './ExploreButton.css'

function ExploreButton() {
  return (
    <NavLink to="/results" id = 'exploreButton'>
      Explore
    </NavLink>  
  )
}

export default ExploreButton;