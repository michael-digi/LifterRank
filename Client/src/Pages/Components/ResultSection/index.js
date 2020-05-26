import React, { useEffect } from 'react';
import EmptyCard from '../ResultCard/EmptyCards';
import { setCardArray } from '../../../actions';
import { makeCards } from '../../helpers';
import './ResultSection.css';
import { useSelector, useDispatch } from 'react-redux';

function ResultSection() {
  const dispatch = useDispatch()
  const gymInfo = useSelector(state => state.nearbyGymInfo)
  const userCoords = useSelector(state => state.currentLocationInfo.coords)
  
  useEffect(() => {
    const result = makeCards(gymInfo.gyms, userCoords)
    dispatch(setCardArray(result))
  }, [gymInfo.gyms, dispatch])

  if(gymInfo.cards.length === 0) {
    return ( 
      <div id = "resultContainer"> 
      { <>
          <EmptyCard />
          <EmptyCard />
          <EmptyCard />
          <EmptyCard />
          <EmptyCard />
        </>
      } </div>
    )
  }
  else {
    return <div id = "resultContainer"> {gymInfo.cards} </div>
  }
}

export default ResultSection;