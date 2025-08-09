// Updated Phone.js
import React, { useState } from 'react';

function Phone() {
  const [phone, setPhone] = useState({
    brand: "Samsung",
    model: "Galaxy S20",
    color: "black",
    year: 2020
  });

  const changeColor = () => {
    setPhone({...phone, color: 'blue'});
  };

  return (
    <div>
      <h2>My phone is a {phone.brand}</h2>
      <p>It is a {phone.color} {phone.model} from {phone.year}</p>
      <button onClick={changeColor}>Change Color</button>
    </div>
  );
}

export default Phone;