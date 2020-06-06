import React, {} from 'react';
import { useSelector } from 'react-redux';
import { Button } from 'react-bootstrap';
import './GymInfoHeader.css';
import reviews from './images/reviewsBig.png'

function GymInfoHeader() {
  const { gym_name, review_count } = useSelector(state => state.gymPageInfo.pageInfo)

  return (
    <div id='gymInfoHeader'>
      <div id='headerContainer'>
        {gym_name ? <>
        <div id='gymNameContainer'>
        <h1>
          {gym_name} 
        </h1>
        <Button className='gymNameButton'>Weightlifting</Button>
        <Button className='gymNameButton'>Powerlifting</Button>
        </div>
        <div id='reviews'>
          <img src={reviews} alt = "review bar" />
          <h3> {review_count} reviews </h3>
        </div> </> : null }
      </div>
    </div>
  )
}

export default GymInfoHeader;