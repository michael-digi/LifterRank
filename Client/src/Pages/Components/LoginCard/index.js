import React, { useState } from 'react';
import axios from 'axios';
import { Card, Button } from 'react-bootstrap';
import './LoginCard.css';

function LoginCard() {
  const [email, setEmail] = useState("");  
  const [pass, setPass] = useState("");
  const [error, setError] = useState("");
  
  const handleSubmit = event => {
    if (event) event.preventDefault()
    axios.post('/login', {
      email: email,
      password: pass
    }).then(response => {
      if (response.data.message) {
       setError(response.data.message)
      }
      else {
        window.location.reload()
      }
    })
  }

  return (
    <Card id = "loginCard">
      <div id = "loginCardHeader">
        <h2> Login </h2>
      </div>
      <form id = "loginForm" onSubmit = {handleSubmit}>
        <div id ="buttonSection">
          <Button className="memberToggleButtons">Lifters</Button>
          <Button className="memberToggleButtons">Owners</Button>
        </div>
        <div id ="inputSection">
          <h4 style={{color: 'red'}}>{error}</h4>
          <input 
            type="text" 
            placeholder="Email" 
            className="loginInput"
            value={email}
            onChange={e => setEmail(e.target.value)}  />
          <input 
            type="password" 
            placeholder="Password" 
            className="loginInput"
            value={pass}
            onChange={e => setPass(e.target.value)}  />
        </div>
        <input type="submit" value="Login" className="signUpInput" id="submitButton" />
      </form>
    </Card>
  )
}

export default LoginCard;