import React from 'react';
import axios from 'axios'
import { Card, Button } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import reviews from './images/reviews.png';
import './ResultCard.css';

function ResultCard(props) {
  let memberships;
  if (props.members) memberships = props.members
  else memberships = 168
  
  const getDetails = async () => {
    // const response = await axios.get('/getGymOverview', {
    //   params: {
    //     gym_name: props.name,
    //     lat: props.coords.lat,
    //     lng: props.coords.lng,
    //     place_id: props.id,
    //     img: props.img,
    //     ratings_total: props.ratingsTotal,
    //   }
    // })
    // console.log(response.data)
    // console.log('details')
  }
  console.log(props)
  return (
    <NavLink to={`/gyminfo/${props.id}/overview`} id='gymCardNavLink'>
      <Card className="resultCard" onClick={() => getDetails()}>
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
    </NavLink>
  )
}

export default ResultCard;