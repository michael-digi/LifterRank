import React, { useEffect, useReducer } from 'react';
import axios from 'axios';
import './PersonalInfoPane.css';

const initialState = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  bio: ''
}

const reducer = (state, { payload, type }) => {
  console.log(payload, ' thijfn')
  switch (type) {
    case 'SINGLE_FIELD':
      return {
        ...state,
        [payload.name]: payload.value
      }
      case 'ALL_FIELDS':
        return {
          ...state, 
          firstName: payload.firstName,
          lastName: payload.lastName,
          email: payload.email,
          phone: payload.phone,
          bio: payload.bio
        }
  }
}


function PersonalInfoPane() {
  const [state, dispatch] = useReducer(reducer, initialState)
  const { firstName, lastName, email, phone, bio } = state

  useEffect(() => {
    async function loadUserInfo() {
      let response = await axios.get('/selectUser')
      const { first_name, last_name, email, phone, bio } = response.data
      dispatch({payload: {firstName: first_name, lastName: last_name, email: email, phone: phone, bio: bio}, type: 'ALL_FIELDS'})
    }
    loadUserInfo()
  },[])
  
  const handleChange = (event) =>  {
    const { name, value } = event.target
    dispatch({payload: {name: name, value: value}, type: 'SINGLE_FIELD'})
  }
  

  const handleSubmit = event => {
    if (event) event.preventDefault()
    console.log(firstName, lastName, email, phone, bio)
    axios.post('/personalInfo', {
      firstName: firstName,
      lastName: lastName,
      email: email,
      phone: phone,
      bio: bio
    }).then(response => {
      console.log(response.data)
    })
  }

  return (
    <div id = "userProfileContainer">
      <div id = "personalInfoHeader">
      </div>
      <form id = "personalInfoForm" onSubmit={handleSubmit}>
        <div id ="inputSection">
          <div className = 'inputInline'>
            <label className="personalInfoLabel">First Name</label>
            <input 
              type="text"
              name="firstName" 
              placeholder=''
              className="input"
              onChange = {handleChange}
              value={firstName} />
          </div>
          <div className = 'inputInline'>
            <label className="personalInfoLabel">Last Name</label>
            <input 
              type="text"
              name="lastName"
              placeholder=''
              className="input"
              onChange = {handleChange}
              value={lastName} />
          </div>
          <div className = 'inputInline'>
            <label className="personalInfoLabel">Email</label>
            <input 
              type="text"
              name="email"
              placeholder=''
              className="input"
              onChange = {handleChange}
              value={email} />
          </div>
          <div className = 'inputInline'>
            <label className="personalInfoLabel">Phone</label>
            <input 
              type="text"
              name="phone"
              placeholder=''
              className="input"
              onChange = {handleChange}
              value={phone} />
          </div>
          <div className = 'inputInline'>
            <label className="personalInfoLabel">Bio</label>
            <textarea
              className="input"
              name="bio"
              placeholder=''
              value={bio}
              onChange = {handleChange}
              rows={5}
            />
          </div>
          <div className = 'inputInline'>
            <input type="submit" value="Confirm" id="submitButton" />
          </div>
        </div>
      </form>
    </div>
  )
}

export default PersonalInfoPane;