import React, { Children } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setCurrentNavCard } from '../../../actions';
import { Link, NavLink, useRouteMatch } from 'react-router-dom'
import './GymPageNavCards.css';

function GymPageNavCards(props) {
  const { place_id, currentNavCard } = useSelector(state => state.gymPageInfo)
  const dispatch = useDispatch()
  let { path, url } = useRouteMatch()
  console.log(path, url)

  const switchCard = (e) => {
    dispatch(setCurrentNavCard(e))
  }

  return (
    <div id ='gymPageNavCards'>
      <div id='gymPageNavCardsContainer'>
       {currentNavCard === 'Overview' 
         ? null : <NavLink className='gymPageNavCard' onClick={() => switchCard('Overview')} to={`${url}/overview`}>Overview</NavLink>}
       {currentNavCard === 'Members' 
         ? null : <NavLink className='gymPageNavCard' onClick={() => switchCard('Members')} to={`${url}/members`}>Members</NavLink>}
       {currentNavCard === 'Equipment' 
         ? null : <NavLink className='gymPageNavCard' onClick={() => switchCard('Equipment')} to={`${url}/equipment`}>Equipment</NavLink>}
       {currentNavCard === 'Events' 
         ? null : <NavLink className='gymPageNavCard' onClick={() => switchCard('Events')} to={`${url}/events`}>Events</NavLink>}
       {currentNavCard === 'Message' 
         ? null : <NavLink className='gymPageNavCard' onClick={() => switchCard('Message')} to={`${url}/message`}>Message</NavLink>}
       {currentNavCard === 'Live Stream' 
         ? null : <NavLink className='gymPageNavCard' onClick={() => switchCard('Live Stream')} to={`${url}/livestream`}>Live Stream</NavLink>}
      </div>
    </div>
  )
}

export default GymPageNavCards;