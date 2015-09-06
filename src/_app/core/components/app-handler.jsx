import { isEqual } from 'lodash';
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import RouterComponent from 'core/components/higher-order/router.jsx';
import Header from 'core/components/common/header.jsx';
import { setRouterState } from 'core/state/actions.js';

@connect(() => ({}))
class AppHandler extends RouterComponent {
  componentDidMount() {
    this.setRouterState({}, this.props);
  }

  componentDidUpdate(prevProps) {
    this.setRouterState(prevProps, this.props);
  }

  setRouterState(previousProps={}, currentProps={}) {
    const hasNewRoute = !isEqual(previousProps.route, currentProps.route);
    const hasNewParams = !isEqual(previousProps.params, currentProps.params);
    const hasNewRouteParams = !isEqual(previousProps.routeParams, currentProps.routeParams);
    if (hasNewRoute || hasNewParams || hasNewRouteParams) {
      const routerState = {
        currentRouteName: this.getCurrentRouteName(),
        params: this.props.params,
        route: this.props.route,
        routeParams: this.props.routeParams,
        location: this.props.location
      };
      this.props.dispatch(setRouterState(routerState))
    }
  }

  render() {
    return (
      <div>
        <Header title="reddio" />
      </div>
    );
  }
}

AppHandler.propTypes = {
  children: PropTypes.element
};

export default AppHandler;
