import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import './GymInfoHours.css';

function GymInfoHours(props) {
  const [hours, setHours] = useState()
  console.log(props.place_id)

  useEffect(() => {
    console.log(props.place_id, ' this is in hours')
    async function getGymHours() {
      let gymHours = await axios.get('/getGymHours', {
        params: {
          place_id: props.place_id
        }
      })

      setHours(gymHours.data)
    }
    getGymHours()
  }, [])

  return (
    <>
      <div id='hoursHeader'>
        Hours
      </div>
      {hours === undefined
       ? null
       : <div id='hoursBody'>
       <div className='hours'><b>Monday:</b> {hours[`${0}`].opening} - {hours[`${0}`].closing}</div>
       <div className='hours'><b>Tuesday:</b> {hours[`${1}`].opening} - {hours[`${1}`].closing}</div>
       <div className='hours'><b>Wednesday:</b> {hours[`${2}`].opening} - {hours[`${2}`].closing}</div>
       <div className='hours'><b>Thursday:</b> {hours[`${3}`].opening} - {hours[`${3}`].closing}</div>
       <div className='hours'><b>Friday:</b> {hours[`${4}`].opening} - {hours[`${4}`].closing}</div>
       <div className='hours'><b>Saturday:</b> {hours[`${5}`].opening} - {hours[`${5}`].closing}</div>
       <div className='hours'><b>Sunday:</b> {hours[`${6}`].opening} - {hours[`${6}`].closing}</div>
     </div>
    }
    </>
    //console.log(days[`${0}`])
  )
}

export default GymInfoHours