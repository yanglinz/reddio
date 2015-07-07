import React from 'react';

class Masthead extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="masthead">
        <h1>Reddio</h1>
      </div>
    );
  }
}

Masthead.propTypes = {
  song: React.PropTypes.object
};

export default Masthead;
