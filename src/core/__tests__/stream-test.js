import _ from 'lodash';
import rx from 'rxjs/Rx';
import { expect } from 'chai';

import { dispatchEvent, applyReducers } from '../stream';

describe('core event command stream', () => {
  let source$;
  let sink$;

  function setupStreams() {
    source$ = new rx.Subject();
    sink$ = new rx.Subject();
  }

  beforeEach(setupStreams);

  it('should dispatch event to source stream', () => {
    const event = { value: 'foo' };
    const dispatchedEvent$ = source$.first().toPromise();
    dispatchEvent(event, source$);

    return dispatchedEvent$.then((dispatchedEvent) => {
      expect(dispatchedEvent.value).to.equal('foo');
    });
  });

  it('should apply a single reducer to source stream', () => {
    function testReducer(stream$) {
      return stream$.filter(event => !event.ignore);
    }
    const reducers = [testReducer];
    applyReducers(reducers, source$, sink$);

    const reducedEvent$ = sink$.first().toPromise();
    dispatchEvent({ ignore: true }, source$);
    dispatchEvent({ ignore: true }, source$);
    dispatchEvent({ value: 'foo', ignore: false }, source$);

    return reducedEvent$.then((reducedEvent) => {
      expect(reducedEvent.value).to.equal('foo');
    });
  });

  it('should apply multiple reducers to source stream', () => {
    function testReducer1(stream$) {
      return stream$.filter(event => event.domain === 'foo');
    }
    function testReducer2(stream$) {
      return stream$.filter(event => event.domain === 'bar');
    }
    const reducers = [testReducer1, testReducer2];
    applyReducers(reducers, source$, sink$);

    const reducedEvents$ = sink$.take(2).toArray().toPromise();
    dispatchEvent({ ignore: true }, source$);
    dispatchEvent({ ignore: true }, source$);
    dispatchEvent({ domain: 'foo', value: 'foo' }, source$);
    dispatchEvent({ ignore: true }, source$);
    dispatchEvent({ domain: 'bar', value: 'bar' }, source$);
    dispatchEvent({ ignore: true }, source$);

    return reducedEvents$.then((reducedEvents) => {
      const values = _.map(reducedEvents, event => event.value);
      expect(values).to.deep.equal(['foo', 'bar']);
    });
  });

  it('should apply reducers with default parameters', () => {
    applyReducers();
  });
});
