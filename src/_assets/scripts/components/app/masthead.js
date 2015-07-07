import React from 'react';
import { AppBar } from '../common/index.js';

class Masthead extends React.Component {
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

Masthead.propTypes = {
  song: React.PropTypes.object
};

export default Masthead;
