/* eslint no-console: 0 */

import _ from 'lodash';
import NProgress from 'NProgress';

function logError(message) {
  console.error(message);
}

let progressBar = {
  fromPromise(promise) {
    let _this = this;
    if (_.isFunction(promise.then)) {
      _this.start();
    }

    promise
      .then(function onSuccess() {
        _this.done();
      })
      .catch(function onError(err) {
        _this.done();
        logError(err);
      });
  },

  start() {
    NProgress.start();
  },

  done() {
    NProgress.done();
  }
};

export { logError, progressBar };
