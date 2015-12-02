import {
  EVENTS,
  YoutubePlayer
} from '../api.js';

describe('Youtube player tests', () => {
  const mountNodeId = 'foo';
  let youtubePlayer;

  beforeEach(() => {
    const mount = document.createElement('div');
    mount.id = mountNodeId;
    document.body.appendChild(mount);
    youtubePlayer = new YoutubePlayer({ mountNode: mountNodeId });
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
