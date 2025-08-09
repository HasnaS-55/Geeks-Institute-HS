import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import {EX1, EX2, EX3} from './App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <EX1 />
    <EX2 />
    <EX3 />
  </React.StrictMode>
);


reportWebVitals();
