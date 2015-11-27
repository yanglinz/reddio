import {
  EVENTS,
  isSoundcloud,
  isYoutube,
  getYoutubeVideoId,
  YoutubePlayer,
  SoundcloudPlayer
} from '../api.js';

describe('Player api tests', () => {
  describe('Utility functions', () => {
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

  describe('Youtube player tests', () => {
    let youtubePlayer;

    beforeEach(() => {
      const mount = document.createElement('div');
      mount.id = 'foo';
      document.body.appendChild(mount);
      youtubePlayer = new YoutubePlayer({ mountNode: mount.id });
    });

    it('should initialize player with sink stream', (done) => {
      youtubePlayer.initialize();
      const { sink$ } = youtubePlayer.getStreams();
      const cutoff$ = sink$.find(event => event.type === EVENTS.PLAYER_READY);
      sink$
        .takeUntil(cutoff$)
        .toArray()
        .subscribe((events) => {
          const eventTypes = events.map(event => event.type);
          expect(eventTypes).toEqual([
            EVENTS.EXTERNAL_SCRIPT_READY,
            EVENTS.EXTERNAL_IFRAME_READY,
            EVENTS.PLAYER_READY
          ]);
          done();
        });
    });

    it('should add play command to source stream', (done) => {
      const url = 'http://foo.bar.baz';
      youtubePlayer.play(url);
      const { source$ } = youtubePlayer.getStreams();
      source$.subscribe((event) => {
        expect(event.type).toEqual(EVENTS.COMMAND_PLAY);
        expect(event.payload).toEqual({ url });
        done();
      });
    });

    it('should add pause command to source stream', (done) => {
      youtubePlayer.pause();
      const { source$ } = youtubePlayer.getStreams();
      source$.subscribe((event) => {
        expect(event.type).toEqual(EVENTS.COMMAND_PAUSE);
        done();
      });
    });

    it('should add unpause command to source stream', (done) => {
      youtubePlayer.unpause();
      const { source$ } = youtubePlayer.getStreams();
      source$.subscribe((event) => {
        expect(event.type).toEqual(EVENTS.COMMAND_UNPAUSE);
        done();
      });
    });
  });

  describe('Soundcloud player tests', () => {
    let soundcloudPlayer;

    beforeEach(() => {
      const mount = document.createElement('div');
      mount.id = 'foo';
      document.body.appendChild(mount);
      soundcloudPlayer = new SoundcloudPlayer({ mountNode: mount.id });
    });

    it('should initialize player with sink stream', (done) => {
      soundcloudPlayer.initialize();
      const { sink$ } = soundcloudPlayer.getStreams();
      const cutoff$ = sink$.find(event => event.type === EVENTS.PLAYER_READY);
      sink$
        .takeUntil(cutoff$)
        .toArray()
        .subscribe((events) => {
          const eventTypes = events.map(event => event.type);
          expect(eventTypes).toEqual([
            EVENTS.EXTERNAL_SCRIPT_READY,
            EVENTS.EXTERNAL_IFRAME_READY,
            EVENTS.PLAYER_READY
          ]);
          done();
        });
    });

    it('should add play command to source stream', (done) => {
      const url = 'http://foo.bar.baz';
      soundcloudPlayer.play(url);
      const { source$ } = soundcloudPlayer.getStreams();
      source$.subscribe((event) => {
        expect(event.type).toEqual(EVENTS.COMMAND_PLAY);
        expect(event.payload).toEqual({ url });
        done();
      });
    });

    it('should add pause command to source stream', (done) => {
      soundcloudPlayer.pause();
      const { source$ } = soundcloudPlayer.getStreams();
      source$.subscribe((event) => {
        expect(event.type).toEqual(EVENTS.COMMAND_PAUSE);
        done();
      });
    });

    it('should add unpause command to source stream', (done) => {
      soundcloudPlayer.unpause();
      const { source$ } = soundcloudPlayer.getStreams();
      source$.subscribe((event) => {
        expect(event.type).toEqual(EVENTS.COMMAND_UNPAUSE);
        done();
      });
    });
  });
});
