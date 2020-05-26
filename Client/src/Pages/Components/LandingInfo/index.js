import React from 'react';
import { Button } from 'react-bootstrap';
import './LandingInfo.css';

function LandingInfo() {
  return (
    <div id = "landingInfo">
      <h1 id = "landingHeader"> Find Your Next Lifting Club</h1>
      <p id = 'landingParagraph'>Connect with nearby gyms, compete with nearby lifters. Sign-up
        to see nearby events, upcoming meets, seminars, or just see who's
        around and make some friends.</p>
      <div id = "buttonContainer">
        <Button className = "landingButton">Lifters</Button>
        <Button className = "landingButton" id = "gymOwnerButton">Gym Owners</Button>
      </div>
    </div>
  )
}

export default LandingInfo;