import React from 'react';
import RedditContainer from './components/reddit.container.js';
import PlayerContainer from './components/player.container.js';

class AppContainer extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className='app-container'>
        <RedditContainer />
        <PlayerContainer />
      </div>
    );
  }
}

React.render(
  <AppContainer/>,
  document.getElementById('app')
);
