import React from 'react';
import { Provider } from 'react-redux';
import { Router, Route, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';

import store from 'core/state';
import Footer from 'core/components/footer';

function history() {
  return syncHistoryWithStore(browserHistory, store);
}

function RouteRoot(props) {
  return (
    <div className="root">
      <h1>Reddio</h1>
      {props.children}
      <Footer />
    </div>
  );
}

RouteRoot.propTypes = {
  children: React.PropTypes.node
};

function RouteWildcard() {
  return (
    <div>
      <h1>Wildcard</h1>
    </div>
  );
}

function AppRoutes() {
  return (
    <Provider store={store}>
      <Router history={history()}>
        <Route path="/" component={RouteRoot}>
          <Route path="*" component={RouteWildcard} />
        </Route>
      </Router>
    </Provider>
  );
}

export default AppRoutes;
