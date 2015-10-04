import { memoize, once } from '../decorators.js';

describe('decorators test', () => {
  describe('memoize test', () => {
    let memoizeTarget;

    beforeEach(() => {
      class Target {
        constructor() {
          this.callCount = 0;
        }

        @memoize()
        increment() {
          this.callCount++;
        }

        getCount() {
          return this.callCount;
        }
      }
      memoizeTarget = new Target();
    });

    it('should not increment when decorated with memoize', () => {
      memoizeTarget.increment();
      memoizeTarget.increment();
      expect(memoizeTarget.getCount()).to.equal(1);
    });
  });

  describe('once test', () => {
    let target;

    beforeEach(() => {
      class Target {
        constructor() {
          this.callCount = 0;
        }

        @once()
        increment() {
          this.callCount++;
        }

        getCount() {
          return this.callCount;
        }
      }
      target = new Target();
    });

    it('should not increment when decorated with once', () => {
      target.increment();
      target.increment();
      expect(target.getCount()).to.equal(1);
    });
  });
});

