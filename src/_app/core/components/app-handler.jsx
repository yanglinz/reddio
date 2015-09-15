import { isEqual } from 'lodash';
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import RouterComponent from 'core/components/higher-order/router.jsx';
import Header from 'core/components/common/header.jsx';
import SubredditContainer from 'reddit/components/subreddit-container.jsx';
import PlayerContainer from 'player/components/player-container.jsx';
import { setRouterState } from 'core/state/actions.js';

@connect(() => ({}))
class AppHandler extends RouterComponent {
  componentWillMount() {
    this.setRouterState({}, this.props);
  }

  componentWillUpdate(nextProps) {
    this.setRouterState(this.props, nextProps);
  }

  setRouterState(previousProps={}, nextProps={}) {
    const hasNewRoute = !isEqual(previousProps.route, nextProps.route);
    const hasNewParams = !isEqual(previousProps.params, nextProps.params);
    const hasNewRouteParams = !isEqual(previousProps.routeParams, nextProps.routeParams);
    if (hasNewRoute || hasNewParams || hasNewRouteParams) {
      const routerState = {
        params: nextProps.params,
        route: nextProps.route,
        routeParams: nextProps.routeParams,
        location: nextProps.location
      };
      this.props.dispatch(setRouterState(routerState));
    }
  }

  render() {
    return (
      <div>
        <Header title="reddio" />
        <SubredditContainer />
        <PlayerContainer />
      </div>
    );
  }
}

AppHandler.propTypes = {
  children: PropTypes.element,
  params: PropTypes.object,
  route: PropTypes.object,
  routeParams: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func
};

export default AppHandler;