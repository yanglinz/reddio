import React from 'react';
import Masthead from './components/masthead.js';
import Nav from './components/nav.js';
import Songs from './components/songs.js';
import Player from './components/player.js';

class Content extends React.Component {
  render() {
    return (
      <div className="content">
        <div className="wrap">
          <Nav/>
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
