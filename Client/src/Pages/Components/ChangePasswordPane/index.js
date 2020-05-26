import React, { useReducer } from 'react';
import axios from 'axios';
import './ChangePasswordPane.css';

const initialState = {
  currentPassword: '',
  newPassword: '',
  confirm: '',
}

const reducer = (state, { name, value }) => {
  return {
    ...state,
    [name]: value
  }
}

function ChangePasswordPane() {
  const [state, dispatch] = useReducer(reducer, initialState)
  const { currentPassword, newPassword, confirm } = state
  
  const handleChange = (event) =>  {
    const { name, value } = event.target
    console.log(name, value)
    dispatch({ name: name, value: value})
  }

  const handleSubmit = event => {
    if (event) event.preventDefault()
    console.log(currentPassword, newPassword, confirm)
    axios.post('/changePassword', {
      cur: currentPassword,
      new: newPassword,
      confirm: confirm
    }).then(response => {
      console.log(response.data)
    })
  }

  return (
    <div id = "userProfileContainer">
      <div id = "personalInfoHeader">
      </div>
      <form id = "personalInfoForm" onSubmit = {handleSubmit}>
        <div id ="inputSection">
          <div className = 'inputInline'>
            <label className="personalInfoLabel">Current Password</label>
            <input 
              type="password"
              name="currentPassword" 
              placeholder=""
              func="setFirstName"
              className="input"
              onChange = {handleChange}
              value={currentPassword} />
          </div>
          <div className = 'inputInline'>
            <label className="personalInfoLabel">New Password</label>
            <input 
              type="password"
              name="newPassword"
              func="setLastName" 
              placeholder="" 
              className="input"
              onChange = {handleChange}
              value={newPassword} />
          </div>
          <div className = 'inputInline'>
            <label className="personalInfoLabel">Confirm New Password</label>
            <input 
              type="password"
              name="confirm"
              func="setEmail"  
              placeholder="" 
              className="input"
              onChange = {handleChange}
              value={confirm} />
          </div>
          <div className = 'inputInline'>
            <input type="submit" value="Confirm" id="submitButton" />
          </div>
        </div>
      </form>
    </div>
  )
}

export default ChangePasswordPane;