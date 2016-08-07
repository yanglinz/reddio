import React from 'react';
import { Provider } from 'react-redux';
import { Router, Route, hashHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';

import store from 'core/state';

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

function AppRoutes() {
  return (
    <Provider store={store}>
      <Router history={history()}>
        <Route path="/" component={Root} />
      </Router>
    </Provider>
  );
}

export default AppRoutes;
