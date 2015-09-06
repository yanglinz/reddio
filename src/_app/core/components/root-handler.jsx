import React, { Component, PropTypes } from 'react';
import { Provider } from 'react-redux';
import { Router, Route } from 'react-router';
import configureStore from 'core/state/store.js';
import AppHandler from 'core/components/app-handler.jsx';
import NotFoundHandler from 'core/components/404-handler.jsx';

const store = configureStore();

class RootHandler extends Component {
  render() {
    return (
      <div>
        <Provider store={store}>
          {() =>
            <Router history={this.props.history}>
              <Route path="/" component={AppHandler}>
                <Route path=":subreddit">
                  <Route path=":sortType">
                    <Route path=":sortRange"/>
                  </Route>
                </Route>
              </Route>
            </Router>
          }
        </Provider>
      </div>
    );
  }
}

RootHandler.propTypes = {
  history: PropTypes.object.isRequired
};

export default RootHandler;
