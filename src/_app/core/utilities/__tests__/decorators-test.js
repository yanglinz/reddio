import { memoize } from '../decorators.js';

describe('decorators test', () => {
  describe('memoize test', () => {
    let memoizeTarget;

    beforeEach(() => {
      class Target {
        constructor() {
          this.callCount = 0;
        }

        increment() {
          this.callCount++;
        }

        @memoize()
        memoizedIncrement() {
          this.callCount++;
        }

        getCount() {
          return this.callCount;
        }
      }
      memoizeTarget = new Target();
    });

    it('should increment when not memoized', () => {
      memoizeTarget.increment();
      memoizeTarget.increment();
      expect(memoizeTarget.getCount()).to.equal(2);
    });

    it('should not increment when memoized', () => {
      memoizeTarget.memoizedIncrement();
      memoizeTarget.memoizedIncrement(); // should not increment
      expect(memoizeTarget.getCount()).to.equal(1);
    });
  });
});

