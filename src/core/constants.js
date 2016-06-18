import _ from 'lodash';

/**
 * Define core application events
 */
const _CORE_EVENTS = [
  'SAGA_INITIALIZED'
];

export const CORE_EVENTS = _.zipObject(_CORE_EVENTS, _CORE_EVENTS);
