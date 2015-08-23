import React, { Component, PropTypes } from 'react';
import { Provider } from 'react-redux';
import { Router, Route } from 'react-router';
import configureStore from '../state/store.js';
import AppContainer from './app-container.jsx';
import SubredditContainer from '../../reddit/components/subreddit-container.jsx';
import SortTypeContainer from '../../reddit/components/sort-type-container.jsx';
import SortRangeContainer from '../../reddit/components/sort-range-container.jsx';

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
                    <Route path=":sortType" component={SortTypeContainer}>
                      <Route path=":sortRange" component={SortRangeContainer} />
                    </Route>
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

RootContainer.propTypes = {
  history: PropTypes.object.isRequired
};

export default RootContainer;
