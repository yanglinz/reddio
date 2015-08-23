import React, { Component, PropTypes } from 'react';
import { Provider } from 'react-redux';
import { Router, Route } from 'react-router';
import configureStore from '../state/store.js';
import AppContainer from './app-container.jsx';

const store = configureStore();

class RootContainer extends Component {
  render() {
    return (
      <div>
        <Provider store={store}>
          {() =>
            <Router history={this.props.history}>
              <Route path="/" component={AppContainer}>
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
