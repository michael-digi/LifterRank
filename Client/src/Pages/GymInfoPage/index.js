import React, { useEffect, useState } from 'react';
import { Switch, Route, BrowserRouter, useRouteMatch } from 'react-router-dom';
import { useDispatch } from 'react-redux'
import { setGymPageInfo, setGymPageId } from '../../actions'
import axios from 'axios'
import ResultHeader from '../Components/ResultHeader';
import GymInfoHeader from '../Components/GymInfoHeader';
import GymInfoOverview from '../Components/GymInfoOverview'
import GymPageNavCards from '../Components/GymPageNavCards';

import GymPageMembers from '../Components/GymPageMembers';
import GymPageEquipment from '../Components/GymPageEquipment'
import GymPageEvents from '../Components/GymPageEvents'
import GymPageMessage from '../Components/GymPageMessage'
import GymPageLiveStream from '../Components/GymPageLiveStream'
import './GymInfoPage.css';

function GymInfoPage(props) {
  let { path, url } = useRouteMatch()
  const dispatch = useDispatch()
  console.log(path, ' this is path')

  useEffect(() => {
    window.scrollTo(0, 0)
    dispatch(setGymPageId(props.match.params.id))
    async function getPageOverview() {
      let gymInfo = await axios.get('/gymPageOverview', {
        params: {
          place_id: props.match.params.id
        }
      })
      dispatch(setGymPageInfo(gymInfo.data))
    }
    getPageOverview()
    return function cleanup() {
      dispatch(setGymPageInfo({}))
    }
  }, [])

  return (
    <>
      <ResultHeader />
      <div id='gymInfo'>
        <GymInfoHeader />
        <div id='gymInfoContent'>
          <GymPageNavCards />
              <Route
                exact path={`${path}/overview`}
                render={(props) => <GymInfoOverview {...props} place_id = {props.match.params.id} />}
              />
              <Route
                exact path={`${path}/members`}
                render={(props) => <GymPageMembers {...props} place_id = {props.match.params.id} />}
              />
              <Route
                exact path={`${path}/equipment`}
                render={(props) => <GymPageEquipment {...props} place_id = {props.match.params.id} />}
              />
              <Route
                exact path={`${path}/events`}
                render={(props) => <GymPageEvents {...props} place_id = {props.match.params.id} />}
              />
              <Route
                exact path={`${path}/message`}
                render={(props) => <GymPageMessage {...props} place_id = {props.match.params.id} />}
              />
              <Route
                exact path={`${path}/livestream`}
                render={(props) => <GymPageLiveStream {...props} place_id = {props.match.params.id} />}
              />
        </div>
      </div>
    </>
  )
}

export default GymInfoPage;