import React, { useState, useEffect } from 'react';
import ExerciseCardRow from '../ExerciseCardRow'
import { makeExerciseRows } from '../../helpers';
import { useSelector } from 'react-redux'
import { Card, Button } from 'react-bootstrap';
import './ExerciseCard.css';

function ExerciseCard(props) {
  const [rows, setRows] = useState('')
  const newPr = useSelector(state => state.liftsModal.newPr)
  
  useEffect(() => {
    let response = makeExerciseRows(props.prArray)
    setRows(response)
  }, [props])
  
  
  return (
    <Card className="exerciseCard">
      <div id = "exerciseCardHeader">
        <div id="exerciseName"> {props.exerciseName} </div>
        <div id="exerciseButtonContainer">
          <Button className='editExerciseButton'>
            Show Variations
          </Button>
          <Button className='editExerciseButton'>
            Edit
          </Button>
        </div>
      </div>
      <div id="exerciseCardBody">
        <div id="tableHeader">
          <div className='colTitle'> Weight </div>
          <div className='colTitle'> Reps </div>
          <div className='colTitle'> Date </div>
        </div>
          {rows}
      </div>
    </Card>
  )
}

export default ExerciseCard;