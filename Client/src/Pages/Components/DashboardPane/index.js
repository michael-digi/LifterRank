import React, { useState } from 'react';
import { useDispatch } from 'react-redux'
import { setDashboardPane } from '../../../actions';
import './DashboardPane.css';

//My apologies for this component
//But hey it works dammit

function DashboardPane() {
  const dispatch = useDispatch()
  const [box1, setBox1] = useState({outline:'2px solid black', fontWeight: 'bold'})
  const [box2, setBox2] = useState({outline:'2px solid lightgray', fontWeight: 'normal'})
  const [box3, setBox3] = useState({outline:'2px solid lightgray', fontWeight: 'normal'})
  const [box4, setBox4] = useState({outline:'2px solid lightgray', fontWeight:'normal'})

  const swapColors1 = () => {
    setBox1({outline:'2px solid black', fontWeight: 'bold'})
    setBox2({outline: '2px solid lightgray', fontWeight: 'normal'})
    setBox3({outline: '2px solid lightgray', fontWeight: 'normal'})
    setBox4({outline: '2px solid lightgray', fontWeight: 'normal'})
    dispatch(setDashboardPane('personalInfo'))
  }

  const swapColors2 = () => {
    setBox1({outline: '2px solid lightgray', fontWeight: 'normal'})
    setBox2({outline: '2px solid black', fontWeight: 'bold'})
    setBox3({outline: '2px solid lightgray', fontWeight: 'normal'})
    setBox4({outline: '2px solid lightgray', fontWeight: 'normal'})
    dispatch(setDashboardPane('chooseYourGyms'))
  }
  const swapColors3 = () => {
    setBox1({outline: '2px solid lightgray', fontWeight: 'normal'})
    setBox2({outline: '2px solid lightgray', fontWeight: 'normal'})
    setBox3({outline: '2px solid black', fontWeight: 'bold'})
    setBox4({outline: '2px solid lightgray', fontWeight: 'normal'})
    dispatch(setDashboardPane('yourLifts'))
  }
  const swapColors4 = () => {
    setBox1({outline: '2px solid lightgray', fontWeight: 'normal'})
    setBox2({outline: '2px solid lightgray', fontWeight: 'normal'})
    setBox3({outline: '2px solid lightgray', fontWeight: 'normal'})
    setBox4({outline: '2px solid black', fontWeight: 'bold'})
    dispatch(setDashboardPane('changePassword'))
  }
  
  return (
    <div id = "container">
      <div className = 'tile' style={{borderLeft: box1.outline}} onClick={() => swapColors1()}>
        <div style={{fontWeight: box1.fontWeight}}>Personal Info</div>
      </div>
      <div className = 'tile' style={{borderLeft: box2.outline}} onClick={() => swapColors2()}>
        <div style={{fontWeight: box2.fontWeight}}>Choose Your Gym(s)</div>
      </div>
      <div className = 'tile' style={{borderLeft: box3.outline}} onClick={() => swapColors3()}>
        <div style={{fontWeight: box3.fontWeight}}>Your Lifts</div>
      </div>
      <div className = 'tile' style={{borderLeft: box4.outline}} onClick={() => swapColors4()}>
        <div style={{fontWeight: box4.fontWeight}}>Change Password</div>
      </div>
    </div>
  )
}

export default DashboardPane;