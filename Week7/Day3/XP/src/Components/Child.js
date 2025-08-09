// src/Components/Child.js
import React from 'react';

class Child extends React.Component {
  componentWillUnmount() {
    alert('The component named Child is about to be unmounted.');
  }

  render() {
    return <h2>Hello World!</h2>;
  }
}

export default Child;