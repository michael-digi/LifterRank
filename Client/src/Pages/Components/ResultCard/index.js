import React from 'react';
import { Card, Button } from 'react-bootstrap';
import reviews from './images/reviews.png';
import './ResultCard.css';

function ResultCard(props) {
  let memberships;
  if (props.members) memberships = props.members
  else memberships = 168
  
  return (
    <Card className="resultCard">
      <div id = "resultCardBody">
        <div id = "resultCardImage">
        <img src = {props.img}  alt = "gym profile" style={{width: '100%', height: '100%'}}/>
        </div>
        <div id = "resultCardContent">
          <div id = "gymName">
            {props.name}
          </div>
          <div id = "gymReviews">
            <img src = {reviews} alt = "review bar" style={{marginRight: '20px', marginBottom: '2px'}}/>
            {props.ratingsTotal} reviews
          </div>
          <div id = "membersAndDistance">
            <div id = "members">
              {memberships} members
            </div>
            <div id = "distance">
              {props.distance} miles
            </div>
          </div>
          <div id = "gymSports">
            <Button className = "sportTagButton">Weightlifting</Button>
            <Button className = "sportTagButton">Powerlifting</Button>
            <Button className = "sportTagButton">Strongman</Button>
          </div>
        </div>
      </div>
    </Card>
  )
}

export default ResultCard;