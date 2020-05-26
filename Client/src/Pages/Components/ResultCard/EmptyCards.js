import React from 'react';
import { Card, Button } from 'react-bootstrap';
import './ResultCard.css';

function EmptyCard(props) {
  return (
    <Card className="resultCard" id="emptyCard">
      <div id = "resultCardBody">
        <div id = "resultCardImage" style={{border: '1px solid black'}}>
        
        </div>
        <div id = "resultCardContent">
          <div id = "gymName">
          </div>
          <div id = "gymReviews">
            
          </div>
          <div id = "membersAndDistance">
            <div id = "members">
            </div>
            <div id = "distance">
            </div>
          </div>
          <div id = "gymSports">
            <Button className = "sportTagButton" style={{color: 'white'}}>Weightlifting</Button>
            <Button className = "sportTagButton" style={{color: 'white'}}>Powerlifting</Button>
            <Button className = "sportTagButton" style={{color: 'white'}}>Strongman</Button>
          </div>
        </div>
      </div>
    </Card>
  )
}

export default EmptyCard;