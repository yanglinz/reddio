import React from 'react';
import Masthead from './reddit/views/masthead.js';
import RedditController from './reddit/views/controller.js';
import PlayerController from './player/views/controller.js';
import { appStateStream } from './core/state.js';

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
