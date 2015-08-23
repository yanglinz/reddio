import React, { Component, PropTypes } from 'react';
import { Provider } from 'react-redux';
import { Router, Route } from 'react-router';
import configureStore from 'core/state/store.js';
import AppContainer from 'core/components/app-container.jsx';
import NotFoundContainer from 'core/components/404-container.jsx';
import SubredditContainer from 'reddit/components/subreddit-container.jsx';

const store = configureStore();

class RootContainer extends Component {
  render() {
    return (
      <div>
        <Provider store={store}>
          {() =>
            <Router history={this.props.history}>
              <Route path="/" component={AppContainer}>
                <Route path="r">
                  <Route path=":subreddit" component={SubredditContainer}>
                    <Route path=":sortType">
                      <Route path=":sortRange"/>
                    </Route>
                  </Route>
                </Route>
                <Route path="404" component={NotFoundContainer} />
              </Route>
            </Router>
          }
        </Provider>
      </div>
    );
  }
}

RootContainer.propTypes = {
  history: PropTypes.object.isRequired
};

export default RootContainer;
