// src/App.js
import React from 'react';
import FormComponent from './Components/FormComponent';
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      formData: {
        firstName: '',
        lastName: '',
        age: '',
        gender: '',
        destination: '',
        nutsFree: false,
        lactoseFree: false,
        vegan: false
      }
    };
  }

  handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    
    this.setState(prevState => ({
      formData: {
        ...prevState.formData,
        [name]: type === 'checkbox' ? checked : value
      }
    }));
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const { formData } = this.state;
    
    // Construct URL parameters
    const params = new URLSearchParams();
    params.append('firstName', formData.firstName);
    params.append('lastName', formData.lastName);
    params.append('age', formData.age);
    params.append('gender', formData.gender);
    params.append('destination', formData.destination);
    if (formData.lactoseFree) params.append('lactoseFree', 'on');
    if (formData.nutsFree) params.append('nutsFree', 'on');
    if (formData.vegan) params.append('vegan', 'on');
    
    // Update URL without page reload
    window.history.pushState({}, '', `/?${params.toString()}`);
  };

  render() {
    return (
      <div className="App">
        <FormComponent 
          formData={this.state.formData} 
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
        />
      </div>
    );
  }
}

export default App;