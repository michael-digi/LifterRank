import React, { useEffect } from 'react';
import GymInfoHours from '../GymInfoHours';
import { useRouteMatch } from 'react-router-dom'
import { StaticGoogleMap, Marker } from 'react-static-google-map';
import { useSelector, useDispatch } from 'react-redux';
import { setCurrentNavCard } from '../../../actions'
import phone from './images/phone.svg'
import home from './images/homeicon.svg'
import './GymInfoOverview.css';

function GymInfoOverview(props) {
  const { address_1, address_2, display_phone, lat, lng, city } = useSelector(state => state.gymPageInfo.pageInfo)
  const currentCard = useSelector(state => state.gymPageInfo.currentNavCard)
  let { url } = useRouteMatch()
  let dispatch = useDispatch()
  
  url = url.split('/')
  let page = url[url.length-1]
  page = page.charAt(0).toUpperCase() + page.slice(1)

  useEffect(() => {
    dispatch(setCurrentNavCard(page))
  })
  
  return (
    <div id="gymInfoBody">
      <div id='gymInfoBodyHeader'>
        <h1 id='gymInfoBodyHeaderTitle'> {currentCard} </h1>
      </div>
      <div id='gymInfoBodyContent'>
        <div id='hoursAndLocation'>
          <div id='hoursAndAddress'>
            <div id='hours'>
              <GymInfoHours place_id = {props.place_id} />
            </div>
            <div id='addressAndPhone'>
              <div id='addressHeader'>
                Address
              </div>
              {address_1 && address_2 ?
                <div id='addressAndPhoneBody'>
                  <div id='address'>
                    <img src={home} 
                      style={{width:'14%', height:'14%', margin:'5% 7% 5% 5%'}}/>
                    {address_1}
                    <br/>
                    {address_2}
                    <br/>
                    {city}
                  </div>
                  <div id='phone'>
                    <img src={phone} 
                      style={{width:'12%', height:'12%', margin:'5% 7% 5% 6%'}}/>
                    {display_phone}
                  </div>
                </div> : null }
            </div>
          </div>
          <div id='staticMap'>
            <StaticGoogleMap size='640x550' zoom='16' apiKey={process.env.REACT_APP_GOOGLE}>
              <Marker location={`${lat},${lng}`} color="red"/>
            </StaticGoogleMap>
          </div>
        </div>
      </div>
    </div>
  )
}

export default GymInfoOverview;