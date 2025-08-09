// src/Components/FormComponent.js
import React from 'react';

class FormComponent extends React.Component {
  render() {
    const { formData, handleChange, handleSubmit } = this.props;
    
    return (
      <div className="form-container">
        <h2>Sample form</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>First Name:</label>
            <input 
              type="text" 
              name="firstName" 
              value={formData.firstName} 
              onChange={handleChange} 
            />
          </div>
          
          <div className="form-group">
            <label>Last Name:</label>
            <input 
              type="text" 
              name="lastName" 
              value={formData.lastName} 
              onChange={handleChange} 
            />
          </div>
          
          <div className="form-group">
            <label>Age:</label>
            <input 
              type="number" 
              name="age" 
              value={formData.age} 
              onChange={handleChange} 
            />
          </div>
          
          <div className="form-group">
            <label>Gender:</label>
            <div className="radio-group">
              <label>
                <input 
                  type="radio" 
                  name="gender" 
                  value="male" 
                  checked={formData.gender === 'male'} 
                  onChange={handleChange} 
                />
                Male
              </label>
              <label>
                <input 
                  type="radio" 
                  name="gender" 
                  value="female" 
                  checked={formData.gender === 'female'} 
                  onChange={handleChange} 
                />
                Female
              </label>
            </div>
          </div>
          
          <div className="form-group">
            <label>Select your destination:</label>
            <select 
              name="destination" 
              value={formData.destination} 
              onChange={handleChange}
            >
              <option value="">Please Choose a destination</option>
              <option value="Japan">Japan</option>
              <option value="Germany">Germany</option>
              <option value="Australia">Australia</option>
            </select>
          </div>
          
          <div className="form-group">
            <label>Dietary restrictions:</label>
            <div className="checkbox-group">
              <label>
                <input 
                  type="checkbox" 
                  name="nutsFree" 
                  checked={formData.nutsFree} 
                  onChange={handleChange} 
                />
                Nuts free
              </label>
              <label>
                <input 
                  type="checkbox" 
                  name="lactoseFree" 
                  checked={formData.lactoseFree} 
                  onChange={handleChange} 
                />
                Lactose free
              </label>
              <label>
                <input 
                  type="checkbox" 
                  name="vegan" 
                  checked={formData.vegan} 
                  onChange={handleChange} 
                />
                Vegan
              </label>
            </div>
          </div>
          
          <button type="submit">Submit</button>
        </form>
        
        <div className="entered-info">
          <h3>Entered information:</h3>
          <p>Your name: {formData.firstName} {formData.lastName}</p>
          <p>Your age: {formData.age}</p>
          <p>Your gender: {formData.gender}</p>
          <p>Your destination: {formData.destination}</p>
          <p>Your dietary restrictions:</p>
          <p>**Nuts free : {formData.nutsFree ? 'Yes' : 'No'}</p>
          <p>**Lactose free : {formData.lactoseFree ? 'Yes' : 'No'}</p>
          <p>**Vegan meal : {formData.vegan ? 'Yes' : 'No'}</p>
        </div>
      </div>
    );
  }
}

export default FormComponent;