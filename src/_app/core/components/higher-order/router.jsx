import { last } from 'lodash';
import React from 'react';
import { Navigation, State } from 'react-router';

const RouterComponent = React.createClass({
  mixins: [Navigation, State],

  render: function() {
    return (
      <div></div>
    );
  }
});

export default RouterComponent;
