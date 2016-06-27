import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route, hashHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';

import store from 'core/state.js';

function Root(props) {
  return (
    <div className="root">
      <h1>Reddio</h1>
      {props.children}
    </div>
  );
}

Root.propTypes = {
  children: React.PropTypes.element
};

function history() {
  return syncHistoryWithStore(hashHistory, store);
}

function App() {
  return (
    <Provider store={store}>
      <Router history={history()}>
        <Route path="/" component={Root} />
      </Router>
    </Provider>
  );
}

export function initialize(mountId) {
  const mountNode = document.getElementById(mountId);
  ReactDOM.render(<App />, mountNode);
}
