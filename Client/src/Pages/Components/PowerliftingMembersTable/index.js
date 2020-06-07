import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { makePowerliftingMemberRows } from '../../helpers'
import './PowerliftingMembersTable.css'

function PowerliftingMembersTable() {
  const [rows, setRows] = useState([])
  const powerliftingMembers = useSelector(state => state.membersTable.sportData)

  useEffect(() => {
    let rows = makePowerliftingMemberRows(powerliftingMembers)
    setRows(rows)
    
  }, [powerliftingMembers])

  return (
    <table>
      <tr>
        <th className='blankHeader'></th>
        <th className='blankHeader'></th>
        <th className='header'>Squat</th>
        <th className='header'>Bench Press</th>
        <th className='header'>Deadlift </th>
        <th className='header'>Total</th>
        <th className='header'>Raw Nats Qualified</th>
      </tr>
      {rows}
   </table>
  ) 
}

export default PowerliftingMembersTable;