// src/Components/Example2.js
import React from 'react';
import profile from '../data/profile.json';

class Example2 extends React.Component {
  render() {
    return (
      <div className="example2">
        <h2>Example2 Component</h2>
        {Object.entries(profile.Skills).map(([category, skills]) => (
          <div key={category}>
            <strong>{category}</strong>
            <ul>
              {skills.map((skill, index) => (
                <li key={index}>{skill}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    );
  }
}

export default Example2;