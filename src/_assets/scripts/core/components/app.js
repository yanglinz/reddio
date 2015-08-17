import React, { Component } from 'react';
import Masthead from './masthead.js';

class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <Masthead/>
      </div>
    );
  }
}

export default App;
