import React from 'react';
import LandingNav from '../Components/LandingNav';
import LandingInfo from '../Components/LandingInfo';
import LandingImage from '../Components/LandingImage';
import './LandingPage.css';

function LandingPage() {
  return (
    <>
      <LandingNav />
      <div id = "landingBody">
        <LandingInfo />
        <LandingImage />
      </div>
    </>
  )
}

export default LandingPage;