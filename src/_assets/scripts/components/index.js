import React from 'react';
import Masthead from './app/masthead.js';
import RedditController from './controllers/reddit.controller.js';
import { appStateStream } from '../state/state.js';

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
        <Masthead />
        <RedditController />
      </div>
    );
  }
}

export default AppContainer;
