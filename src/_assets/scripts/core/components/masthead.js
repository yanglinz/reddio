import React, { Component } from 'react';
import { AppBar } from 'material-ui';
import materialUI from './decorators/material-ui.js';

@materialUI
class Masthead extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <AppBar title='reddio'/>
      </div>
    );
  }
}

export default Masthead;
