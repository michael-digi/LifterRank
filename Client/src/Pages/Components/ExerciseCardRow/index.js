import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux';
import './ExerciseCardRow.css';

function ExerciseCardRow(props) {
  const [prProps, setPrProps] = useState({})
  const newPr = useSelector(state => state.liftsModal.newPr)

  useEffect(() => {
    console.log(props, ' this is props here')
    setPrProps(props)
  }, [newPr])

  return (
    <div id = 'row'> 
      <div className = 'rowCell'>
        {prProps.weight}
      </div>
      <div className = 'rowCell'>
        {prProps.reps}
      </div>
      <div className = 'rowCell'>
        {prProps.dateLifted}
      </div>
    </div>
  )
}

export default ExerciseCardRow
