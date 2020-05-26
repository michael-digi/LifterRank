import React from 'react';
import { useDispatch } from 'react-redux';
import { showModalConfirm, setModalData } from '../../../actions';
import { Card } from 'react-bootstrap';
import reviews from './images/reviews.png';
import './ModalResultCard.css';

function ModalResultCard(props) {
  const dispatch = useDispatch()
  return (
    <Card className="modalResultCard" 
      onClick={() =>  {
        dispatch(showModalConfirm(true))
        dispatch(setModalData(props))
      }
    }
    >
      <div id = "modalResultCardBody">
        <div id = "modalResultCardImage">
          <img src = {props.img}  alt = "gym profile" style={{width: '100%', height: '100%'}}/>
        </div>
        <div id = "modalResultCardContent">
          <div id = "modalGymName">
            <b> {props.gym_name} </b>
            <div id = "gymReviews">
              <img src = {reviews} alt = "review bar" style={{marginRight: '10px', marginBottom: '2px', marginTop: '2px'}}/>
              {props.ratingsTotal} reviews
            </div>
          </div>
          <div id = "modalAddress">
            {props.address[0]}
            <br/>
            {props.address[1]}, {props.address[2]}
            <br />
            {props.address[3]}
          </div>
        </div>
      </div>
    </Card>
  )
}

export default ModalResultCard;