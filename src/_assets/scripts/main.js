import React from 'react';
import AppContainer from './components/index.js';
import Masthead from './app/masthead.js';
import RedditController from './controllers/reddit.controller.js';
import PlayerController from './controllers/player.controller.js';
import { appStateStream } from '../core/state.js';

class AppContainer extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    /**
     * appStateStream is an observable stream of all appState changes.
     * Trigger a re-render of the AppContainer component by calling setState
     */
    appStateStream.subscribe(function renderOnStateChange() {
      this.setState({});
    }.bind(this));
  }

  render() {
    return (
      <div className="app-container">
        <header className="app-header">
          <Masthead />
        </header>

        <main className="app-content">
          <RedditController />
        </main>

        <footer className="app-footer">
          <PlayerController />
        </footer>
      </div>
    );
  }
}

React.render(
  <AppContainer />,
  document.getElementById('app')
);
