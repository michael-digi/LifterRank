import React, {} from 'react';
import ResultHeader from '../Components/ResultHeader';
import GymInfoHeader from '../Components/GymInfoHeader';
import GymInfoBody from '../Components/GymInfoBody'
import GymInfoNavCards from '../Components/GymInfoNavCards';
import './GymInfoPage.css';

function GymInfoPage() {

  return (
    <>
      <ResultHeader />
      <div id='gymInfo'>
        <GymInfoHeader />
        <GymInfoBody />
        <GymInfoNavCards />
      </div>
    </>
  )
}

export default GymInfoPage;