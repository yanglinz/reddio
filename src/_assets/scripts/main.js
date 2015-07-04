import React from 'react';
import RedditContainer from './components/reddit.container.js';
import { appStateStream } from './state/state.js';

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
        <RedditContainer />
      </div>
    );
  }
}

React.render(
  <AppContainer/>,
  document.getElementById('app')
);
