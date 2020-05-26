import React from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { showModalConfirm } from '../../../actions';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

function ConfirmGymModal(props) {
  const dispatch = useDispatch()
  const confirmGymData = useSelector(state => state.gymModal.data)

  const handleSubmit = () => {
    axios.post('/addGymMember', {
      gymData: confirmGymData
    }).then(response => {
      if (response.data.user_id) window.location.reload()
    })
  }

  const handleKeyDown = (e) => {
    console.log(e.keyCode)
    if (e.keyCode === 13) handleSubmit()
  }

  const close = () => {
    dispatch(showModalConfirm(false))
  }

  return (
    <div onKeyDown={handleKeyDown}>
      <Modal show={props.show} onHide={close} >
        <Modal.Header closeButton>
          <Modal.Title>
            Confirm Gym
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Add <b> {confirmGymData.gym_name} </b> to <b> Your Gyms </b>?
        </Modal.Body>
        <Modal.Footer>
        <Button variant="primary" onClick={handleSubmit}>
          Confirm
        </Button>
        <Button variant="secondary" onClick={() => close()}>
          Cancel
        </Button>
        </Modal.Footer>
      </Modal>
    </div>
   );
  }

export default ConfirmGymModal;