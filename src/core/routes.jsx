import React from 'react';
import { Provider } from 'react-redux';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';

import store from 'core/store';
import Home from 'core/components/home';
import Footer from 'core/components/footer';
import Posts from 'reddit/components/posts';

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
  children: React.PropTypes.node,
};

function RouteHome() {
  return (
    <div>
      <Home />
    </div>
  );
}

function RouteWildcard() {
  return (
    <div>
      <Home />
      <Posts />
    </div>
  );
}

function AppRoutes() {
  return (
    <Provider store={store}>
      <Router history={history()}>
        <Route path="/" component={RouteRoot}>
          <IndexRoute component={RouteHome} />
          <Route path="*" component={RouteWildcard} />
        </Route>
      </Router>
    </Provider>
  );
}

export default AppRoutes;
