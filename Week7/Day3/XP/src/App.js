// src/App.js
import React from 'react';
import ErrorBoundary from './Components/ErrorBoundary';
import BuggyCounter from './Components/BuggyCounter';
import Color from './Components/Color';
import Color1 from './Components/Color2';
import './App.css';

export function EX1() {
  return (
    <div className="App">
      <h1>Exercise 1</h1>
      <h2>Simulation 1: Two counters in one ErrorBoundary</h2>
      <ErrorBoundary>
        <BuggyCounter />
        <BuggyCounter />
      </ErrorBoundary>

      <hr />

      <h2>Simulation 2: Two counters, each in their own ErrorBoundary</h2>
      <ErrorBoundary>
        <BuggyCounter />
      </ErrorBoundary>
      <ErrorBoundary>
        <BuggyCounter />
      </ErrorBoundary>

      <hr />

      <h2>Simulation 3: Counter without ErrorBoundary</h2>
      <BuggyCounter />
    </div>
  );
}

export function EX2() {
  return (
    <div className="App">
      <h1>Exercise 2</h1>
      <Color />
      
    </div>
  );
}



export function EX3() {
  return (
    <div className="App">
      <Color1 />
    </div>
  );
}
