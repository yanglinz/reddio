import React, { Component } from 'react';

class IFrame extends Component {
  constructor(props) {
    super(props);
  }

  shouldComponentUpdate() {
    return false;  // never re-render component
  }

  render() {
    return (
      <div id={this.props.mountNodeId} />
    );
  }
}

IFrame.propTypes = {
  mountNodeId: React.PropTypes.string.isRequired
};

export default IFrame;
