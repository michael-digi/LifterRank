import React, { useState } from 'react';
import './DashboardTile.css';

function DashboardTile() {
  const [boxBorder, setBoxBorder] = useState('')
  return (
    <div id = "tile" style={{borderLeft: boxBorder}} onClick={() => setBoxBorder('1px solid black')}>
      
    </div>
  )
}

export default DashboardTile;