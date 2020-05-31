import React, { useState, useEffect } from 'react';
import { makeDashboardCards, usePosition } from '../../helpers';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from 'react-bootstrap';
import { showModalChooseGym } from '../../../actions';
import ChooseGymModal from '../ChooseGymModal';
import ConfirmGymModal from '../ConfirmGymModal';
import axios from 'axios';
import Modal from 'react-bootstrap/Modal';
import './ChooseYourGymsPane.css';

function ChooseYourGymsPane() {
  const [ cards, setCards ] = useState([])
  const confirmGymModal = useSelector(state => state.gymModal.confirmGymModal)
  const chooseGymModal = useSelector(state => state.gymModal.chooseGymModal)
  const newGym = useSelector(state => state.gymModal.newGym)
  const userCoords = usePosition()
  const dispatch = useDispatch()

  console.log(chooseGymModal, ' this is yea')

  useEffect(() => {
    async function getUsersMemberships() {
      let response = await axios.get('/getUsersMemberships')
      let cards = makeDashboardCards(response.data, userCoords)
      setCards(cards)
    }
    getUsersMemberships()
  }, [newGym])

  const handleShow = () => {
    dispatch(showModalChooseGym(true))
  }

  return (
    <div id = "paneContainer">
      <div id = "chooseGymsHeader">
        <p style={{
          margin: '0',
          fontSize: '45px', 
          borderBottom: '2px solid lightgray', 
          display: 'flex', 
          alignItems: 'center'}}> Your Gyms </p>
        <div id = "chooseGymsButtons">
          <Button 
            className = 'chooseGymsButton navButton shadow-none' onClick={() => handleShow()}> Add </Button>
          <Button 
            className = 'chooseGymsButton navButton shadow-none'> Delete </Button>
        </div>
      </div>
      <div id = "chooseGymsBody">
        {cards}
      </div>
      <ConfirmGymModal 
            show = {confirmGymModal}/>
          <ChooseGymModal 
            show = {chooseGymModal}/> 
    </div>
  )
}

export default ChooseYourGymsPane;