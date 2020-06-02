import React, { useEffect } from 'react';
import ResultHeader from '../Components/ResultHeader';
import ResultSection from '../Components/ResultSection';
import Map from '../Components/Map';
import { searchNearby, usePosition } from '../helpers';
import { useDispatch } from "react-redux";
import { setCurrentUserLocation, setGymInfo, setCardArray } from '../../actions';
import _ from 'lodash';
import './ResultsPage.css';

function ResultsPage() {
  const dispatch = useDispatch()
  const position = usePosition()

  useEffect(() => {
    if (position.coords == null) return 
    dispatch(setCurrentUserLocation(position.coords))
    return function cleanup() {
      dispatch(setCurrentUserLocation({}))
    }
  }, [position, dispatch])

  useEffect(() => {
    if (position.coords == null) return
    let savedCoords = localStorage.getItem(_.round(position.coords.lat, 3), _.round(position.coords.lng, 3))
    
    if (savedCoords !== null) {
      console.log('ah yis, used the cache')
      dispatch(setGymInfo(JSON.parse(savedCoords)))
    }
    else {
      searchNearby(position.coords.lat, position.coords.lng)
        .then(result => {
          console.log('fak, the endpoint got hit')
          console.log(result)
          localStorage.setItem(
            JSON.stringify(
              _.round(position.coords.lat, 3),
              _.round(position.coords.lng, 3)
            ), JSON.stringify(result))
          dispatch(setGymInfo(result))
        }, [position, dispatch])
    }
    return function cleanup() {
      dispatch(setGymInfo([]))
      dispatch(setCardArray([]))
      console.log('unmounted')
    }
  })

  return (
    <>
      <ResultHeader />
      <div id = "resultBody">
        <ResultSection />
        <Map />
      </div>
    </>
  )
}

export default ResultsPage;