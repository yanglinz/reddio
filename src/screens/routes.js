import React from 'react';
import { Provider } from 'react-redux';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';

import store from 'state/store';
import AppScreen from 'screens/App';
import HomeScreen from 'screens/App/screens/Home';
import ListingScreen from 'screens/App/screens/Listing';

function AppRoutes() {
  const history = syncHistoryWithStore(browserHistory, store);
  return (
    <Provider store={store}>
      <Router history={history}>
        <Route path="/" component={AppScreen}>
          <IndexRoute component={HomeScreen} />
          <Route path="*" component={ListingScreen} />
        </Route>
      </Router>
    </Provider>
  );
}

export default AppRoutes;
