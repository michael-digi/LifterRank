import React, { useState, useEffect } from 'react';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { showModalChooseLift } from '../../../actions';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

function YourLiftsModal(props) {
  const dispatch = useDispatch()
  const [liftType, setLiftType] = useState('')
  const [liftTypeOptions, setLiftTypeOptions] = useState([])
  const [exercise, setExercise] = useState('')
  const [exerciseOptions, setExerciseOptions] = useState([])
  const [reps, setReps] = useState()
  const [weight, setWeight] = useState()

  useEffect(() => {
    async function getLiftTypes() {
      let response = await axios.get('/getLiftTypes')
      setLiftTypeOptions(response.data)
    }
    getLiftTypes()
  }, [])

  const handleSubmit = () => {
    // axios.post('/addGymMember', {
    //   gymData: confirmGymData
    // }).then(response => {
    //   if (response.data.user_id) window.location.reload()
    // })
    console.log('clicked')
  }

  const handleKeyDown = (e) => {
    if (e.keyCode === 13) handleSubmit()
  }
  
  const close = () => {
    setExerciseOptions([])
    setExercise('')
    setLiftType('')
    dispatch(showModalChooseLift(false))
  }

  const changeLiftType = async e => {
    console.log(e)
    setLiftType(e.label)
    let exercises = await axios.get('/getExercisesFromType', {
      params: { exercise: e.label }
    })
    setExerciseOptions(exercises.data)
  }

  const changeExercise = e => {
    setExercise(e.label)
  }

  const confirmLift = async () => {
    let PR = {
      exerciseType: liftType,
      exercise: exercise,
      reps: reps,
      weight: weight
    }
    let exercises = await axios.post('/addNewPr', {
      PR: PR
    })
    
  }
  
  return (
    <div onKeyDown={handleKeyDown}>
      <Modal show={props.show} onHide={close} >
        <Modal.Header closeButton>
          <Modal.Title>
            Add your PR's
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p style={{fontSize:'20px', margin:'0px 0px 5px 0px'}}> Lift type </p>
          <Dropdown 
            options={liftTypeOptions} 
            value={liftType}
            onChange={(e) => changeLiftType(e)}
            placeholder="Select an option" />
          {exerciseOptions.length !== 0 
          ? 
          <> <p style={{fontSize:'20px', margin:'10px 0px 5px 0px'}}> Exercise </p>
             <Dropdown
               options={exerciseOptions} 
               value={exercise}
               onChange={(e) => changeExercise(e)}
               placeholder="Select an option" /> </>
          : null }
          {exercise 
          ?
          <div id = 'weightAndReps' style={{ display: 'flex', flexDirection: 'row' }}> 
            <div>
              <p style={{fontSize:'20px', margin: '10px 0px 5px 0px'}}> Weight </p>
              <input 
                style={{padding: '3px 8px'}}
                type='text' 
                placeholder=''
                value={weight} 
                onChange={e => setWeight(e.target.value)} /> 
            </div>
            <div style = {{ marginLeft: '20px' }}>
              <p style={{fontSize:'20px', margin: '10px 0px 5px 0px'}}> Reps </p>
              <input 
                style={{padding: '3px 8px'}}
                type='text' 
                placeholder=''
                value={reps} 
                onChange={e => setReps(e.target.value)} /> 
              </div>
          </div>
          : null }
          {exercise
          ? <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '20px' }}>
              <Button id = "prButton" onClick={() => confirmLift()}>Confirm PR</Button>
            </div>
          : null}
        </Modal.Body>
        <Modal.Footer>
        </Modal.Footer>
      </Modal>
    </div>
   );
  }

export default YourLiftsModal;