// src/Components/Example1.js
import React from 'react';
import profile from '../data/profile.json';

class Example1 extends React.Component {
  render() {
    return (
      <div className="example1">
        <h1>Example1 Component</h1>
        <ul>
          {profile.SocialMedias.map((url, index) => (
            <li key={index}>
              <input type="checkbox" id={`social-${index}`} />
              <label htmlFor={`social-${index}`}>{url}</label>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default Example1;