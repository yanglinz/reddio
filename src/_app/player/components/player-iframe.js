/* eslint react/no-multi-comp: 0 */

import React, { Component, PropTypes } from 'react';

class Iframe extends Component {
  shouldComponentUpdate() {
    return false;  // never re-render component
  }

  render() {
    return (
      <div id={this.props.mountNode} />
    );
  }
}

Iframe.propTypes = {
  mountNode: PropTypes.string.isRequired
};

class PlayerIframe extends Component {
  render() {
    const { isActive, mountNode } = this.props;
    let activeClass = isActive ? 'active' : 'inactive';
    activeClass = `mount-node ${activeClass}`;
    return (
      <div className={activeClass}>
        <Iframe mountNode={mountNode} />
      </div>
    );
  }
}

PlayerIframe.propTypes = {
  isActive: PropTypes.bool.isRequired,
  mountNode: PropTypes.string.isRequired
};

export default PlayerIframe;
