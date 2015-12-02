import {
  EVENTS,
  SoundcloudPlayer
} from '../api.js';

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

  it('should initialize and return a promise', (done) => {
    const initialized = soundcloudPlayer.initialize();
    initialized.then(() => {
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
