import Rx from 'rx';

describe('Smoke tests', () => {
  describe('RxJs smoke tests', () => {
    it('should assert values in a observable', (done) => {
      const source$ = new Rx.ReplaySubject();
      source$.onNext(1);
      source$.onNext(2);
      source$.onNext(3);
      const cutoff$ = source$.find(num => num === 3);
      source$
        .takeUntil(cutoff$)
        .toArray()
        .subscribe((nums) => {
          expect(nums).toEqual([1, 2, 3]);
          done();
        });
    });
  });
});
