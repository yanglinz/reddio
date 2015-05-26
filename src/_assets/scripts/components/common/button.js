import React from 'react';

class Button extends React.Component {
  render() {
    return (
      <div className="btn">
        <a>{this.props.children}</a>
      </div>
    );
  }
}

export default Button;
