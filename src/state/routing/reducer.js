export function selectPathname(state) {
  return state.routing.locationBeforeTransitions.pathname;
}

export function selectIsIndex(state) {
  return selectPathname(state) === '/';
}
