import React from 'react';
import LoginHeader from '../Components/LoginHeader';
import SignUpCard from '../Components/SignUpCard';
import LoginImage from '../Components/LoginImage';
import './SignUpPage.css'

function SignUpPage() {
  return (
    <>
      <LoginHeader />
      <div id = "signUpBody">
        <SignUpCard />
        <LoginImage />
      </div>
    </>
  )
}

export default SignUpPage;