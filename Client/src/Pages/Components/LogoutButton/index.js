import React from 'react';
import { Button } from 'react-bootstrap';
import Cookies from 'js-cookie';
import './LogoutButton.css'

function LogoutButton() {
  const logout = () => {
    const token = Cookies.get('token')
    if (token) Cookies.set('token', '')
    window.location.reload()
  }

  return (
      <Button 
        id = "logoutButton" 
        className = 'navButton shadow-none'
        onClick={() => logout()}>Logout</Button>
  )
}

export default LogoutButton;