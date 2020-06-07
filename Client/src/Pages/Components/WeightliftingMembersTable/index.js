import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { makeWeightliftingMemberRows } from '../../helpers'
import WeightliftingTableRow from '../WeightliftingTableRow';
import './WeightliftingMembersTable.css'

function WeightliftingMembersTable() {
  const [rows, setRows] = useState([])
  const weightliftingMembers = useSelector(state => state.membersTable.sportData)

  useEffect(() => {
    let rows = makeWeightliftingMemberRows(weightliftingMembers)
    setRows(rows)
  }, [weightliftingMembers])

  return (
    <table>
      <tr>
        <th className='blankHeader'></th>
        <th className='blankHeader'></th>
        <th className='header'>Snatch</th>
        <th className='header'>Clean and Jerk</th>
        <th className='header'>Total </th>
        <th className='header'>National Qualified</th>
        <th className='header'>AO Qualified</th>
      </tr>
      {rows}
   </table>
  ) 
}

export default WeightliftingMembersTable;

