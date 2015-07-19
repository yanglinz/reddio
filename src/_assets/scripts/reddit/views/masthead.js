import React from 'react';
import { AppBar } from 'material-ui';
import { BaseViewComponent } from '../../core/views/index.js';

class Masthead extends BaseViewComponent {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="masthead">
        <AppBar title="Reddio" />
      </div>
    );
  }
}

export default Masthead;
