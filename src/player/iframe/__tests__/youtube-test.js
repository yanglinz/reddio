import _ from 'lodash';
import { expect } from 'chai';

import * as youtube from '../youtube.js';

describe('youtube iframe player', () => {
  describe('url parser', () => {
    it('should detect youtube urls', () => {
      const youtubeUrls = [
        'http://www.youtube.com/watch?v=ujO_N6DmFM8',
        'https://www.youtube.com/watch?v=ujO_N6DmFM8',
        'https://www.youtube.com/watch?v=8VmvZGQbojs',
        'http://youtu.be/4POUDVKNXVI',
        'https://youtu.be/4POUDVKNXVI'
      ];
      _.each(youtubeUrls, (url) => {
        expect(youtube.isYoutube(url)).to.equal(true);
      });
    });

    it('should detect non-youtube urls', () => {
      const nonYoutubeUrls = [
        'https://www.youtube.net/watch?v=8VmvZGQbojs',
        'https://soundcloud.com/ronpopemusic/a-drop-in-the-ocean-6'
      ];
      _.each(nonYoutubeUrls, (url) => {
        expect(youtube.isYoutube(url)).to.equal(false);
      });
    });

    it('should get youtube ids', () => {
      const youtubeIds = {
        'https://www.youtube.com/watch?v=ujO_N6DmFM8': 'ujO_N6DmFM8',
        'https://www.youtube.com/watch?v=8VmvZGQbojs': '8VmvZGQbojs',
        'https://youtu.be/4POUDVKNXVI': '4POUDVKNXVI'
      };
      _.each(youtubeIds, (expectedId, url) => {
        expect(youtube.getVideoId(url), expectedId);
      });
    });
  });
});
