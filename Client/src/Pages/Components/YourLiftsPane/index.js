import React, { useState, useEffect } from 'react';
import { makeExerciseCard } from '../../helpers';
import { showModalChooseLift } from '../../../actions';
import { useSelector, useDispatch } from 'react-redux';
import { Button } from 'react-bootstrap';
import YourLiftsModal from '../YourLiftsModal';
import ExerciseCard from '../ExerciseCard';

import axios from 'axios';
import './YourLiftsPane.css';

function YourLiftsPane() {
  const [ cards, setCards ] = useState([])
  const chooseLiftsModal = useSelector(state => state.liftsModal.chooseLiftsModal)
  const newPr = useSelector(state => state.liftsModal.newPr)
  const dispatch = useDispatch()

  useEffect(() => {
    async function getUsersPrs() {
      let response = await axios.get('/getUserPrs')
      let cards = makeExerciseCard(response.data)
      console.log(cards, ' cards')
      setCards(cards)
    }
    getUsersPrs()
  }, [newPr])

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
      <div id="yourLiftsBody" >
        {cards}
      </div>
      <YourLiftsModal
          show = {chooseLiftsModal} />
    </div>
  )
}

export default YourLiftsPane;