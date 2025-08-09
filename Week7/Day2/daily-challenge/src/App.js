// Final App.js
import React, { useState } from 'react';
import './App.css';

function App() {
  const [languages, setLanguages] = useState([
    {name: "Php", votes: 0},
    {name: "Python", votes: 0},
    {name: "JavaScript", votes: 0},
    {name: "Java", votes: 0}
  ]);

  const increaseVotes = (index) => {
    const updatedLanguages = [...languages];
    updatedLanguages[index].votes += 1;
    setLanguages(updatedLanguages);
  };

  return (
    <div className="App">
      <h1>Vote Your Language!</h1>
      <div className="languages-container">
        {languages.map((language, index) => (
          <div key={index} className="language-item">
            <span>{language.votes}</span>
            <span>{language.name}</span>
            <button onClick={() => increaseVotes(index)}>Click Here</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;