import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { showModalChooseGym } from '../../../actions';
import { makeModalCards, makeModalCardsFromDb } from '../../helpers';
import axios from 'axios';

function ChooseGymModal(props) {
  const [gym, setGym] = useState('')
  const [results, setResults] = useState([])
  const [cards, setCards] = useState([])
  const userCoords = useSelector(state => state.currentLocationInfo.coords)
  const dispatch = useDispatch()
  
  const handleChange = e => {
    console.log(e.target.value)
    setGym(e.target.value)
  }

  const handleSubmit = async event => {
    if (event) event.preventDefault()
    if (gym.length === 0) return
    // let nearby = await axios.post('/fuzzySearch', {
    //   gym_name: gym
    // })
    // console.log(nearby.data, ' this is nearby')
    let search = await axios.get('/searchByText', {
      params: {
        gym_name: gym
      }
    })
    console.log(search.data)
    setResults(search.data)
    // setResults(nearby.data)
  }

  const close = () => {
    setGym('')
    setResults([])
    setCards([])
    dispatch(showModalChooseGym(false))
  }

  useEffect(() => {
    const gymCards = makeModalCards(results, userCoords)
    setCards(gymCards)
    return () => {
      console.log('unmounted')
    }
  }, [results])

  return (
    <div>
      <Modal show={props.show} onHide={close}>
        <Modal.Header closeButton>
          <Modal.Title>
            Search Gyms
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Type in your gym's name:
          <form onSubmit={handleSubmit}>
            <div>
              <div>
                <input 
                  type="text"
                  name="gym" 
                  placeholder="Search for a Gym"
                  className="input"
                  style={{width: '100%', padding: '10px', borderRadius: '5px', border: '1px lightgray solid', marginTop: '15px'}}
                  value={gym}
                  onChange={handleChange} />
              </div>
            </div>
          </form>
          <div id="gymResults">
            {cards}
          </div>
        </Modal.Body>
        <Modal.Footer>
        <Button variant="primary" onClick={handleSubmit}>
          Search
        </Button>
        <Button variant="secondary" onClick={() => close()}>
          Cancel
        </Button>
        </Modal.Footer>
      </Modal>
    </div>
   );
  }

export default ChooseGymModal