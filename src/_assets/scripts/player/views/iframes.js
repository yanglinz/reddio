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
      <div className="iframe-container">
        <div className="youtube-container">
          <div id="youtube-mount-node"></div>
        </div>
        <div className="soundcloud-container">
          <div id="soundcloud-mount-node"></div>
        </div>
      </div>
    );
  }
}

export default IFrame;
