import React, { Component, PropTypes } from 'react';

class SortRangeContainer extends Component {
  render() {
    return (
      <div>
        <h1>Sort range container</h1>
        {this.props.children}
      </div>
    );
  }
}

SortRangeContainer.propTypes = {
  children: PropTypes.element
};

export default SortRangeContainer;
