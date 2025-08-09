// Final Color.js
import React from 'react';

class Color extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      favoriteColor: 'red'
    };
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({ favoriteColor: 'yellow' });
    }, 1000);
  }

  shouldComponentUpdate() {
    return true;
  }

  getSnapshotBeforeUpdate(prevProps, prevState) {
    console.log('in getSnapshotBeforeUpdate');
    console.log('Previous color:', prevState.favoriteColor);
    console.log('Current color:', this.state.favoriteColor);
    return null;
  }

  componentDidUpdate() {
    console.log('after update');
  }

  changeColor = () => {
    this.setState({ favoriteColor: 'blue' });
  };

  render() {
    return (
      <div>
        <h1>My favorite color is {this.state.favoriteColor}</h1>
        <button onClick={this.changeColor}>Change Color</button>
      </div>
    );
  }
}

export default Color;