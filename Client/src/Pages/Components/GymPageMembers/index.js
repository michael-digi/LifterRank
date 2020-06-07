import React, { useEffect } from 'react';
import WeightliftingMembersTable from '../WeightliftingMembersTable';
import PowerliftingMembersTable from '../PowerliftingMembersTable';
import { useRouteMatch } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux';
import { setCurrentNavCard, setMembershipData, setSportMembershipTable } from '../../../actions'
import axios from 'axios';
import './GymPageMembers.css'
import { Button } from 'react-bootstrap';

function GymPageMembers() {
  const currentCard = useSelector(state => state.gymPageInfo.currentNavCard)
  const place_id = useSelector(state => state.gymPageInfo.place_id)
  const sport = useSelector(state => state.membersTable.sport)
  let { url } = useRouteMatch()
  let dispatch = useDispatch()
  
  url = url.split('/')
  let page = url[url.length-1]
  page = page.charAt(0).toUpperCase() + page.slice(1)

  useEffect(() => {
    dispatch(setCurrentNavCard(page))
  })

  const loadLifters = async (sport) => {
    if (sport === 'weightlifting') {
      let stats = await axios.get('/getGymWeightliftingStats', {
        params: place_id
      })
      console.log(stats.data)
      dispatch(setSportMembershipTable('weightlifting'))
      dispatch(setMembershipData(stats.data))
    }
    if (sport === 'powerlifting') {
      let stats = await axios.get('/getGymPowerliftingStats', {
        params: place_id
      })
      console.log(stats.data)
      dispatch(setSportMembershipTable('powerlifting'))
      dispatch(setMembershipData(stats.data))
    }
    if (sport === 'strongman') {
      dispatch(setSportMembershipTable('strongman'))
    }
  }
  
  return (
    <div id="gymMembers">
      <div id='gymMembersHeader'>
        <div id='gymMembersHeaderSection'>
          <h1>
            {currentCard}
          </h1>
        </div>
        <div id='gymMembersHeaderSports'>
          <div id='sportsButtonContainer'>
            <Button className='membersSportButton' onClick={() => loadLifters('weightlifting')}> Weightlifting </Button>
            <Button className='membersSportButton' onClick={() => loadLifters('powerlifting')}> Powerlifting </Button>
            <Button className='membersSportButton' onClick={() => loadLifters('strongman')}> Strongman </Button>
          </div>
        </div>
      </div>
        {sport === 'weightlifting' ? <WeightliftingMembersTable /> : null}
        {sport === 'powerlifting' ? <PowerliftingMembersTable /> : null}
    </div>
  )
}

export default GymPageMembers;