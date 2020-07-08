import React, { useState, useEffect } from 'react';
import { usePosition } from '../helpers';
import { useSelector, useDispatch } from 'react-redux';
import { setCurrentUserLocation } from '../../actions';
import { Route } from 'react-router-dom';
import DashboardPane from '../Components/DashboardPane';
import PersonalInfoPane from '../Components/PersonalInfoPane'
import ChooseYourGymsPane from '../Components/ChooseYourGymsPane';
import YourLiftsPane from '../Components/YourLiftsPane';
import ChangePassword from '../Components/ChangePasswordPane';
import LogoutButton from '../Components/LogoutButton';
import './DashboardPage.css';

function DashboardPage() {
  //which pane is currently selected is read in from the redux store
  let pane = useSelector(state => state.dashboardPane.pane)
  let position = usePosition()
  const dispatch = useDispatch()
  
  useEffect(() => {
    if (position.coords == null) return 
    dispatch(setCurrentUserLocation(position.coords))
  }, [position, dispatch])

  // conditional rendering used to dictate which pane is visible upon it being clicked
  return (
    <>
      <div id = "dashboardNav">
        <LogoutButton />
      </div>
      <div id = 'dashboard'>
        <DashboardPane />
        {pane === 'personalInfo' ? <PersonalInfoPane /> : null}
        {pane === 'chooseYourGyms' ? <ChooseYourGymsPane /> : null}
        {pane === 'yourLifts' ? <YourLiftsPane /> : null}
        {pane === 'changePassword' ? <ChangePassword /> : null}
      </div>
    </>
  )
}

export default DashboardPage;