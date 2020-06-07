import React from 'react';
import './PowerliftingTableRow.css'
import avatar from './images/avatar-placeholder.png'

function WeightliftingTableRow(props) {
  return (
    <>
      <tr id='powerliftingRow'>
        <td className='avatar'>
          <img className='avatarImg' src={avatar}/>
        </td>
        <td className='avatarName'>{props.first_name} {props.last_name}</td>
        <td className='cell'>{props.squat}</td>
        <td className='cell'>{props.bench}</td>
        <td className='cell'>{props.deadlift}</td>
        <td className='cell'>{props.squat + props.bench + props.deadlift}</td>
        <td className='cell'>Yes</td>
      </tr>
    </>
  ) 
}

export default WeightliftingTableRow;