import { each } from 'lodash';
import { isSoundcloud, isYoutube } from '../api.js';

describe('reddit api test', () => {
  describe('utilities test', () => {
    const soundcloudUrls = [
      'https://soundcloud.com/toomanyzooz/the2020',
      'https://soundcloud.com/kasbomusic/kasbo-i-dont-get'
    ];
    const youtubeUrls = [
      'https://www.youtube.com/watch?v=ujO_N6DmFM8',
      'https://www.youtube.com/watch?v=8VmvZGQbojs',
      'https://youtu.be/4POUDVKNXVI'
    ];

    it('should parse soundcloud url correctly', () => {
      each(soundcloudUrls, (url) => {
        expect(isSoundcloud(url)).to.equal(true);
      });
    });

    it('should reject non-soundcloud url correctly', () => {
      each(youtubeUrls, (url) => {
        expect(isSoundcloud(url)).to.equal(false);
      });
    });

    it('should parse youtube url correctly', () => {
      each(youtubeUrls, (url) => {
        expect(isYoutube(url)).to.equal(true);
      });
    });

    it('should reject non-youtube url correctly', () => {
      each(soundcloudUrls, (url) => {
        expect(isYoutube(url)).to.equal(false);
      });
    });
  });
});
