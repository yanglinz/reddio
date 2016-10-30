import _ from 'lodash';
import { expect } from 'chai';

import * as soundcloud from '../soundcloud';

describe('soundcloud iframe player', () => {
  describe('url parser', () => {
    it('should detect soundcloud urls', () => {
      const soundcloudUrls = [
        'http://www.soundcloud.com/ronpopemusic/a-drop-in-the-ocean-6',
        'https://soundcloud.com/ronpopemusic/a-drop-in-the-ocean-6',
      ];
      _.each(soundcloudUrls, (url) => {
        expect(soundcloud.isSoundcloud(url)).to.equal(true);
      });
    });

    it('should detect non-soundcloud urls', () => {
      const nonSoundcloudUrls = [
        'https://soundcloud.net/ronpopemusic/a-drop-in-the-ocean-6',
        'https://www.youtube.com/watch?v=8VmvZGQbojs',
        'https://youtu.be/4POUDVKNXVI',
      ];
      _.each(nonSoundcloudUrls, (url) => {
        expect(soundcloud.isSoundcloud(url)).to.equal(false);
      });
    });
  });
});
