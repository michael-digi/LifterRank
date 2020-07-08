import React, { useEffect } from 'react';
import { Route, useRouteMatch } from 'react-router-dom';
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
  //matches the current path in the router, which is /gyminfo/:id, the id being the place_id
  let { path } = useRouteMatch()
  const dispatch = useDispatch()
  console.log(path, ' this is path')

  //setGymPageId is setting the idea grabbed from the URL params, which is the gym's place id, and is used to get
  //general info about the gym from the db
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