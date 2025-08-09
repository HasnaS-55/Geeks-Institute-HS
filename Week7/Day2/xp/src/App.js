// App.js
import React from 'react';
import Car from './Components/Car';
import Events from './Components/Events';
import Phone from './Components/Phone';
import Color from './Components/Color';

export function EX1() {
  const carinfo = {name: "Ford", model: "Mustang"};
  return (
    
    <div className="App">
      <h1>Exercise 1</h1>
      <Car model={carinfo.model} />
    </div>
  );
}

export function EX2() {
  return (

    <div className='EX1'>
      <h1>Exercise 1</h1>
      <Events />
      <Phone />
      <Color />
    </div>
  );
}

