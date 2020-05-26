import React from 'react';
import Cookies from 'js-cookie';
import { Nav } from 'react-bootstrap';
import ResultInputBar from '../ResultInputBar';
import LoginButton from '../LoginButton';
import SignUpButton from '../SignUpButton';
import './ResultHeader.css'
import LogoutButton from '../LogoutButton';

function ResultHeader() {
  return (
    <Nav id = "resultHeader">
        <ResultInputBar />
        <div id = 'resultPageNav'>
          { Cookies.get('token')
            ? <LogoutButton />
            : <><LoginButton /> <SignUpButton /></>
          }
        </div>
    </Nav>
  )
}

export default ResultHeader;