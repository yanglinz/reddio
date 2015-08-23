import React, { Component, PropTypes } from 'react';

class SortTypeContainer extends Component {
  render() {
    return (
      <div>
        <h1>Sort type container</h1>
        {this.props.children}
      </div>
    );
  }
}

SortTypeContainer.propTypes = {
  children: PropTypes.element
};

export default SortTypeContainer;
