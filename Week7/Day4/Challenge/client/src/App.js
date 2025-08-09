// Updated client/src/App.js
import React, { Component } from 'react';

class App extends Component {
  state = {
    serverMessage: '',
    inputValue: '',
    response: ''
  };

  componentDidMount() {
    this.fetchHelloMessage();
  }

  fetchHelloMessage = async () => {
    try {
      const response = await fetch('http://localhost:5600/api/hello');
      const data = await response.json();
      this.setState({ serverMessage: data.message });
    } catch (error) {
      console.error('Error fetching message:', error);
    }
  };

  handleInputChange = (e) => {
    this.setState({ inputValue: e.target.value });
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5600/api/world', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ value: this.state.inputValue })
      });
      const data = await response.json();
      this.setState({ 
        response: data.message,
        inputValue: ''
      });
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  render() {
    return (
      <div className="App">
        <h1>{this.state.serverMessage}</h1>
        
        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            value={this.state.inputValue}
            onChange={this.handleInputChange}
            placeholder="Type something..."
          />
          <button type="submit">Submit</button>
        </form>
        
        {this.state.response && <p>{this.state.response}</p>}
      </div>
    );
  }
}

export default App;