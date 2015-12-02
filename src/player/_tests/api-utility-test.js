import { isSoundcloud, isYoutube, getYoutubeVideoId } from '../api.js';

describe('Player utility functions', () => {
  it('should parse soundcloud url', () => {
    expect(isSoundcloud('https://soundcloud.com/toomanyzooz/the2020')).toEqual(true);
    expect(isSoundcloud('https://soundcloud.com/kasbomusic/kasbo-i-dont-get')).toEqual(true);
  });

  it('should parse youtube url', () => {
    expect(isYoutube('https://www.youtube.com/watch?v=ujO_N6DmFM8')).toEqual(true);
    expect(isYoutube('https://www.youtube.com/watch?v=ujO_N6DmFM8')).toEqual(true);
    expect(isYoutube('https://youtu.be/4POUDVKNXVI')).toEqual(true);
  });

  it('should get youtube video id', () => {
    expect(getYoutubeVideoId('https://www.youtube.com/watch?v=VIDEO_ID')).toEqual('VIDEO_ID');
    expect(getYoutubeVideoId('https://www.youtube.com/watch?v=VIDEO_ID&foo=bar')).toEqual('VIDEO_ID');
    expect(getYoutubeVideoId('https://www.youtube.com/watch?foo=bar&v=VIDEO_ID')).toEqual('VIDEO_ID');
    expect(getYoutubeVideoId('https://youtu.be/VIDEO_ID')).toEqual('VIDEO_ID');
  });
});
