import { last } from 'lodash';
import React from 'react';
import { Navigation, State } from 'react-router';

const RouterComponent = React.createClass({
  mixins: [Navigation, State],

  getCurrentRouteName: function getCurrentRouteName() {
    const path = window.location.href;
    return last(path.split('/'));
  },

  render: function render() {
    return (
      <div></div>
    );
  }
});

export default RouterComponent;
