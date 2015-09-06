export const SET_ROUTER_STATE = 'SET_ROUTER_STATE';

export function setRouterState(routerState) {
  return {
    type: SET_ROUTER_STATE,
    routerState: routerState
  };
}
