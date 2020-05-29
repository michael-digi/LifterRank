import React, { useState, useEffect } from 'react';
import { makeDashboardCards, usePosition } from '../../helpers';
import { showModalChooseLift } from '../../../actions';
import { useSelector, useDispatch } from 'react-redux';
import { Button } from 'react-bootstrap';
import YourLiftsModal from '../YourLiftsModal';

import axios from 'axios';
import './YourLiftsPane.css';

function ChooseYourGymsPane() {
  const [ cards, setCards ] = useState([])
  const userCoords = usePosition()
  const chooseLiftsModal = useSelector(state => state.liftsModal.chooseLiftsModal)
  const dispatch = useDispatch()

  // useEffect(() => {
  //   async function getUsersMemberships() {
  //     let response = await axios.get('/getUsersMemberships')
  //     let cards = makeDashboardCards(response.data, userCoords)
  //     setCards(cards)
  //   }
  //   getUsersMemberships()
  // }, [])

  const handleShow = () => {
    dispatch(showModalChooseLift(true))
  }

  return (
    <div id = "chooseGymsContainer">
      <div id = "chooseGymsHeader">
        <p style={{
          margin: '0',
          minWidth: '210px',
          fontSize: '45px', 
          borderBottom: '2px solid lightgray', 
          display: 'flex',
          justifyContent: 'center', 
          alignItems: 'center'}}> Your Lifts </p>
        <div id = "chooseGymsButtons">
          <Button 
            className = 'chooseGymsButton navButton shadow-none' onClick={() => handleShow()}> Add </Button>
          <Button 
            className = 'chooseGymsButton navButton shadow-none'> Delete </Button>
        </div>
      </div>
      <YourLiftsModal
          show = {chooseLiftsModal} />
    </div>
  )
}

export default ChooseYourGymsPane;