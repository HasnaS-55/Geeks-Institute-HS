// src/Components/Example3.js
import React from 'react';
import profile from '../data/profile.json';

class Example3 extends React.Component {
  render() {
    return (
      <div className="example3">
        <h2>Example3 Component</h2>
        {profile.Experiences.map((exp, index) => (
          <div key={index} className="experience">
            <div className="no-image">NO IMAGE AVAILABLE</div>
            <div className="experience-details">
              <h3>{exp.title}</h3>
              <p>{exp.position}</p>
              <p>{exp.date} {exp.location}</p>
              <p>{exp.description}</p>
            </div>
          </div>
        ))}
      </div>
    );
  }
}

export default Example3;