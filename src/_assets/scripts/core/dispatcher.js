import _ from 'lodash';
import Rx from 'rx';
import { logError } from './utils.js';

const dispatcherStream = new Rx.Subject();

const dispatcher = {
  dispatch(action) {
    if (_.isFunction(action.payload.then)) {  // if the action's payload is a promise
      action.payload
        .then(function onResolve(asyncPayload) {
          let resolvedAction = _.extend(action, {payload: asyncPayload});
          dispatcherStream.onNext(resolvedAction);
        })
        .catch(function onError(err) {
          logError(err);
        });
    } else {
      dispatcherStream.onNext(action);
    }
  }
};

export default dispatcher;
export { dispatcherStream };
