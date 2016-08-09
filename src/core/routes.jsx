import _ from 'lodash';
import React from 'react';
import routePattern from 'route-pattern';
import { Provider } from 'react-redux';
import { Router, Route, IndexRedirect, hashHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';

import store from 'core/state';

function history() {
  return syncHistoryWithStore(hashHistory, store);
}

function RouteRoot(props) {
  return (
    <div className="root">
      <h1>Reddio</h1>
      {props.children}
    </div>
  );
}

function Route404() {
  return (
    <div>
      <h1>404</h1>
    </div>
  );
}

function RouteR(props) {
  return props.children;
}

function RouteSubreddit(props) {
  const { subreddit } = props.params;
  return (
    <div>
      <h1>Subreddit: {subreddit}</h1>
      {props.children}
    </div>
  );
}

function RouteSortType(props) {
  const sortType = props.route.path;
  return (
    <div>
      <h1>SortType: {sortType}</h1>
      {props.children}
    </div>
  );
}

function RouteSortRange(props) {
  const { sortRange } = props.params;
  return (
    <div>
      <h1>SortRange: {sortRange}</h1>
      {props.children}
    </div>
  );
}

const DEFAULT_SUBREDDIT = 'listentothis';
const DEFAULT_SORT_TYPE = 'hot';
const DEFAULT_SORT_RANGE = 'day';

function AppRoutes() {
  return (
    <Provider store={store}>
      <Router history={history()}>
        <Route path="/" component={RouteRoot}>
          <IndexRedirect to="r" />
          <Route path="r" component={RouteR}>
            <IndexRedirect to={DEFAULT_SUBREDDIT} />
            <Route path=":subreddit" component={RouteSubreddit}>
              <IndexRedirect to={DEFAULT_SORT_TYPE} />
              <Route path="hot" component={RouteSortType} />
              <Route path="new" component={RouteSortType} />
              <Route path="random" component={RouteSortType} />
              <Route path="top" component={RouteSortType}>
                <IndexRedirect to={DEFAULT_SORT_RANGE} />
                <Route path=":sortRange" component={RouteSortRange} />
              </Route>
            </Route>
          </Route>
          <Route path='*' component={Route404} />
        </Route>
      </Router>
    </Provider>
  );
}

/**
 * Given a pathname parse the semantics of the subreddit and sort type
 * @param {string} pathname - The pathname of the route e.g. /r/listentothis/hot
 */
export function routePathParams(pathname) {
  const patterns = [
    '/r/:subreddit/:sortType',
    '/r/:subreddit/:sortType/:sortRange'
  ];
  let pathParams = null;
  _.each(patterns, pattern => {
    const compiledPattern = routePattern.fromString(pattern);
    const isMatch = compiledPattern.matches(pathname);
    if (isMatch) {
      const match = compiledPattern.match(pathname);
      pathParams = match.pathParams;
      return false;  // stop iteration
    }
  });
  return pathParams;
}

export default AppRoutes;
