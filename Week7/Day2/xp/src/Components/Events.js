// Final Events.js
import React, { useState } from 'react';

function Events() {
  const [isToggleOn, setIsToggleOn] = useState(true);

  const clickMe = () => alert('I was clicked');
  
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      alert(`You pressed Enter with input: ${e.target.value}`);
    }
  };

  const toggle = () => setIsToggleOn(!isToggleOn);

  return (
    <div>
      <button onClick={clickMe}>Click Me</button>
      <input onKeyDown={handleKeyDown} placeholder="Press Enter" />
      <button onClick={toggle}>{isToggleOn ? 'ON' : 'OFF'}</button>
    </div>
  );
}

export default Events;