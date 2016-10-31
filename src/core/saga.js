import { fork, put } from 'redux-saga/effects';

import { CORE_EVENTS } from 'core/constants';
import { redditSaga } from 'reddit/saga';
import { playerSaga } from 'player/saga';

export function* initializeSaga() {
  const initializedEvent = { type: CORE_EVENTS.SAGA_INITIALIZED };
  yield put(initializedEvent);
}

export function* coreSaga() {
  yield [
    fork(initializeSaga),
  ];
}

export function* rootSaga() {
  yield [
    fork(coreSaga),
    fork(redditSaga),
    fork(playerSaga),
  ];
}
