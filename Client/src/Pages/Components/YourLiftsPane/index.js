import React, { useState, useEffect } from 'react';
import { makeDashboardCards, usePosition } from '../../helpers';
import { useSelector } from 'react-redux';
import { Button } from 'react-bootstrap';
import ChooseGymModal from '../ChooseGymModal';
import ConfirmGymModal from '../ConfirmGymModal';
import axios from 'axios';
import './YourLiftsPane.css';

function ChooseYourGymsPane() {
  const [ searchGymModal, setModal ] = useState(false)
  const [ cards, setCards ] = useState([])
  const showConfirmModal = useSelector(state => state.gymModal.modal)
  const userCoords = usePosition()

  useEffect(() => {
    async function getUsersMemberships() {
      let response = await axios.get('/getUsersMemberships')
      let cards = makeDashboardCards(response.data, userCoords)
      setCards(cards)
    }
    getUsersMemberships()
  }, [])

  
  const handleShow = () => {
    setModal(true)
  }

  const handleClose = () => {
    setModal(false)
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
        {showConfirmModal 
         ? <ConfirmGymModal 
             show = {showConfirmModal} />
         : <ChooseGymModal 
             handleShow = {handleShow}
             handleClose = {handleClose}
             show = {searchGymModal}
             type = 'lifts' /> }
      </div>
    </div>
  )
}

export default ChooseYourGymsPane;