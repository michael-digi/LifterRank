import React from 'react';
import LoginHeader from '../Components/LoginHeader';
import LoginCard from '../Components/LoginCard';
import LoginImage from '../Components/LoginImage';
import './LoginPage.css'

function LoginPage() {
  return (
    <>
      <LoginHeader />
      <div id = "loginBody">
        <LoginCard />
        <LoginImage />
      </div>
    </>
  )
}

export default LoginPage;