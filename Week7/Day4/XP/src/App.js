// src/App.js
import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import ErrorBoundary from './Components/ErrorBoundary';
import HomeScreen from './Components/HomeScreen';
import ProfileScreen from './Components/ProfileScreen';
import ShopScreen from './Components/ShopScreen';
import PostList from './Components/PostList';
import Example1 from './Components/Example1';
import Example2 from './Components/Example2';
import Example3 from './Components/Example3';
import dotenv from 'dotenv'

import './App.css';

dotenv.config()

export function EX1() {
  return (
    <BrowserRouter>
      <div className="App">
        <h1>Exercise 1</h1>
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
          <div className="container-fluid">
            <div className="navbar-nav">
              <NavLink 
                to="/" 
                className={({ isActive }) => 
                  `nav-link ${isActive ? 'active' : ''}`
                }
              >
                Home
              </NavLink>
              <NavLink 
                to="/profile" 
                className={({ isActive }) => 
                  `nav-link ${isActive ? 'active' : ''}`
                }
              >
                Profile
              </NavLink>
              <NavLink 
                to="/shop" 
                className={({ isActive }) => 
                  `nav-link ${isActive ? 'active' : ''}`
                }
              >
                Shop
              </NavLink>
            </div>
          </div>
        </nav>

        <div className="container mt-4">
          <Routes>
            <Route path="/" element={
              <ErrorBoundary>
                <HomeScreen />
              </ErrorBoundary>
            } />
            <Route path="/profile" element={
              <ErrorBoundary>
                <ProfileScreen />
              </ErrorBoundary>
            } />
            <Route path="/shop" element={
              <ErrorBoundary>
                <ShopScreen />
              </ErrorBoundary>
            } />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}


export function EX2() {
  return (
    <div className="App">
      <h1>Exercise 2</h1>
      <h1>Blog Posts</h1>
      <PostList />
    </div>
  );
}

export function EX3() {
  return (
    <div className="App">
      <h1>Exercise 3</h1>
      <Example1 />
      <hr />
      <Example2 />
      <hr />
      <Example3 />
    </div>
  );
}



export function EX4() {
  const [response, setResponse] = useState(null);

  const postData = async () => {
    const webhookUrl = 'process.env.WEBHOOK_URL'; 
    
    const data = {
      key1: 'myusername',
      email: 'mymail@gmail.com',
      name: 'Isaac',
      lastname: 'Doe',
      age: 27
    };

    try {
      const response = await fetch(webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(data)
      });

      const result = await response.text();
      console.log('Response:', result);
      setResponse(result);
      
      // For debugging
      console.log({
        status: response.status,
        headers: Object.fromEntries(response.headers.entries()),
        body: result
      });

    } catch (error) {
      console.error('Error:', error);
      setResponse('Error occurred: ' + error.message);
    }
  };

  return (
    <div className="App">
      <h1>Webhook.site POST Example</h1>
      <button onClick={postData}>Send Data to Webhook</button>
      
      {response && (
        <div className="response">
          <h3>Response:</h3>
          <pre>{JSON.stringify(response, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}