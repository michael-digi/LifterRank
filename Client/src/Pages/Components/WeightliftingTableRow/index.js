import React from 'react';
import './WeightliftingTableRow.css'
import avatar from './images/avatar-placeholder.png'

function WeightliftingTableRow(props) {
  return (
    <>
      <tr id='weightliftingRow'>
        <td className='avatar'>
          <img className='avatarImg' src={avatar}/>
        </td>
        <td className='avatarName'>{props.first_name} {props.last_name}</td>
        <td className='cell'>{props.snatch}</td>
        <td className='cell'>{props.clean_and_jerk}</td>
        <td className='cell'>{props.snatch + props.clean_and_jerk}</td>
        <td className='cell'>No</td>
        <td className='cell'>Yes</td>
      </tr>
    </>
  ) 
}

export default WeightliftingTableRow;