import { partialCoverage } from '../smoke.jsx';

describe('smoke test', () => {
  it('should pass', () => {
    expect(1).to.equal(1);
  });

  it('should display test coverage correctly', () => {
    expect(partialCoverage()).to.equal(true);
  });
});
