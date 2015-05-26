'use strict';

import React from 'react';
import Masthead from './components/masthead.js';
import Songs from './components/songs.js';
import Player from './components/player.js';

var Content = React.createClass({
  render: function () {
    return (
      <div className="content">
        <div className="wrap">
          <Songs/>
        </div>
      </div>
    );
  }
});

var App = React.createClass({
  render: function () {
    return (
      <div className="wrap">
        <Masthead/>
        <Content/>
        <Player/>
      </div>
    );
  }
});

React.render(
  <App />,
  document.getElementById('app')
);
