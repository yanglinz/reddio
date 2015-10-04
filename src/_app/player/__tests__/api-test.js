import { each } from 'lodash';
import { getYoutubeID } from '../api.js';

describe('player api test', () => {
  describe('utilities test', () => {
    const youtubeIds = {
      'https://www.youtube.com/watch?v=ujO_N6DmFM8': 'ujO_N6DmFM8',
      'https://www.youtube.com/watch?v=8VmvZGQbojs': '8VmvZGQbojs',
      'https://youtu.be/4POUDVKNXVI': '4POUDVKNXVI'
    };

    it('should get youtube video id correctly', () => {
      each(youtubeIds, (expectedId, url) => {
        expect(getYoutubeID(url)).to.equal(expectedId);
      });
    });
  });
});
