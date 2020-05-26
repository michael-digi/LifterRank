import React, { useState } from 'react';
import axios from 'axios';
import { Card, Button } from 'react-bootstrap';
import './SignUpCard.css';

function SignUpCard() {
  const [email, setEmail] = useState("");  
  const [pass, setPass] = useState("");
  const [error, setError] = useState("");
  
  const handleSubmit = event => {
    if (event) event.preventDefault()
    axios.post('/signUp', {
      email: email,
      password: pass
    }).then(response => {
      console.log(response.data)
    })
  }
  
  return (
    <Card id = "signUpCard">
      <div id = "signUpCardHeader">
        <h2> Sign Up </h2>
      </div>
      <form id = "signUpForm" onSubmit = {handleSubmit}>
        <div id = "buttonSection">
          <Button className="memberToggleButtons">Lifters</Button>
          <Button className="memberToggleButtons">Owners</Button>
        </div>
        <div id ="inputSection">
        <h4 style={{color: 'red'}}>{error}</h4>
          <input 
            type="text" 
            placeholder="Email" 
            className="signUpInput" 
            value={email}
            onChange={e => setEmail(e.target.value)} />
          <input 
            type="password" 
            placeholder="Password" 
            className="signUpInput" 
            value={pass}
            onChange={e => setPass(e.target.value)}  />
        </div>
        <input 
          type="submit" 
          value="Sign Up" 
          className="signUpInput" 
          id="submitButton"
           />
      </form>
    </Card>
  )
}

export default SignUpCard;