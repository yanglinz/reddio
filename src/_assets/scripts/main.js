'use strict';

import React from 'react';
import Masthead from './components/masthead.js';
import Songs from './components/songs.js';
import Player from './components/player.js';

class Content extends React.Component {
  render() {
    return (
      <div className="content">
        <div className="wrap">
          <Songs/>
        </div>
      </div>
    );
  }
}

class App extends React.Component {
  render() {
    return (
      <div className="wrap">
        <Masthead/>
        <Content/>
        <Player/>
      </div>
    );
  }
}

React.render(
  <App />,
  document.getElementById('app')
);
