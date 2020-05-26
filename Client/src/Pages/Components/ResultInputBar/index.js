import React, { useState } from 'react';
import { Button, InputGroup, FormControl } from 'react-bootstrap';
import './ResultInputBar.css';

function ResultInputBar() {
  const [search, setInput] = useState("");  
  const [place, setPlace] = useState("");  

  return (
    <InputGroup className="mb-3" id = "resultSearch">
      <FormControl
        className="resultInput"
        placeholder="Gym name"
        aria-label="Gym name"
        aria-describedby="basic-addon2"
      />
      <FormControl
        className="resultInput"
        placeholder="Location"
        aria-label="Location"
        aria-describedby="basic-addon2"
      />
      <InputGroup.Append>
        <Button variant="outline-secondary" id = "resultButton"> Search </Button>
      </InputGroup.Append>
    </InputGroup>
  )
}

export default ResultInputBar;