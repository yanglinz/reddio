import { reduce } from 'lodash';
import Rx from 'rx';

export const EVENTS = {
  COMMAND_INITIALIZE: 'COMMAND_INITIALIZE',
  COMMAND_PLAY: 'COMMAND_PLAY',
  COMMAND_PAUSE: 'COMMAND_PAUSE',
  COMMAND_UNPAUSE: 'COMMAND_UNPAUSE',
  EXTERNAL_SCRIPT_READY: 'EXTERNAL_SCRIPT_READY',
  EXTERNAL_IFRAME_READY: 'EXTERNAL_IFRAME_READY',
  PLAYER_READY: 'PLAYER_READY',
  PLAYER_STATE_CHANGE: 'PLAYER_STATE_CHANGE'
};

export function isYoutube(url) {
  return url.includes('youtube') || url.includes('youtu.be');
}

export function isSoundcloud(url) {
  return url.includes('soundcloud');
}

const PARSER = document.createElement('a');

export function getYoutubeVideoId(url) {
  let videoId;
  PARSER.href = url;

  if (url.includes('youtu.be')) {
    videoId = PARSER.pathname.split('/')[1];
  } else {
    let params = PARSER.search;
    params = params.replace('?', '').split('&');
    params = reduce(params, (memo, p) => {
      const key = p.split('=')[0];
      memo[key] = p.split('=')[1];
      return memo;
    }, {});
    videoId = params.v;
  }

  return videoId;
}

class BasePlayer {
  constructor(options = {}) {
    const { mountNode } = options;

    this.mountNode = mountNode;
    this.source$ = new Rx.ReplaySubject();
    this.sink$ = new Rx.ReplaySubject();

    this._subscribe();
  }

  _subscribe() {
    throw new Error('NotImplementedError');
  }

  initialize() {
    this.source$.onNext({ type: EVENTS.COMMAND_INITIALIZE });
  }

  play(url) {
    this.source$.onNext({ type: EVENTS.COMMAND_PLAY, payload: { url } });
  }

  pause() {
    this.source$.onNext({ type: EVENTS.COMMAND_PAUSE });
  }

  unpause() {
    this.source$.onNext({ type: EVENTS.COMMAND_UNPAUSE });
  }

  getStreams() {
    return {
      source$: this.source$,
      sink$: this.sink$
    };
  }
}

export class YoutubePlayer extends BasePlayer {
  _subscribe() {
    this._subscribeToInitialize();
    this._subscribeToPlay();
    this._subscribeToPause();
    this._subscribeToUnpause();
  }

  _subscribeToInitialize() {
    const initializeYoutube = () => {
      const onPlayerReady = () => {
        this.sink$.onNext({ type: EVENTS.PLAYER_READY });
      };

      const onPlayerStateChange = (event) => {
        this.sink$.onNext({ type: EVENTS.PLAYER_STATE_CHANGE, payload: event });
      };

      window.onYouTubeIframeAPIReady = () => {
        this.sink$.onNext({ type: EVENTS.EXTERNAL_IFRAME_READY });

        const DEFAULT_VIDEO_ID = '8tPnX7OPo0Q';  // blank video
        this.player = new window.YT.Player(this.mountNode, {
          height: '100%',
          width: '100%',
          videoId: DEFAULT_VIDEO_ID,
          events: { onReady: onPlayerReady, onStateChange: onPlayerStateChange }
        });
      };

      require(['./contrib/youtube.js'], () => {
        this.sink$.onNext({ type: EVENTS.EXTERNAL_SCRIPT_READY });
      });
    };

    this.source$
      .filter(event => event.type === EVENTS.COMMAND_INITIALIZE)
      .first()
      .subscribe(initializeYoutube);
  }

  _subscribeToPlay() {
    this.source$
      .filter(event => event.type === EVENTS.COMMAND_PLAY)
      .subscribe((event) => {
        if (this.player) {
          if (event.payload.url) {
            const videoId = getYoutubeVideoId(event.payload.url);
            this.player.loadVideoById(videoId);
          } else {
            this.player.playVideo();  // play the currently cued video
          }
        }
      });
  }

  _subscribeToPause() {
    this.source$
      .filter(event => event.type === EVENTS.COMMAND_PAUSE)
      .subscribe(() => {
        if (this.player) {
          this.player.pauseVideo();
        }
      });
  }

  _subscribeToUnpause() {
    this.source$
      .filter(event => event.type === EVENTS.COMMAND_UNPAUSE)
      .subscribe(() => {
        if (this.player) {
          this.player.playVideo();
        }
      });
  }
}

export class SoundcloudPlayer extends BasePlayer {
  _subscribe() {
    this._subscribeToInitialize();
    this._subscribeToPlay();
    this._subscribeToPause();
    this._subscribeToUnpause();
  }

  _subscribeToInitialize() {
    const initializeSoundcloud = () => {
      const soundcloudMount = document.getElementById(this.mountNode);
      const soundcloudIframeId = `${this.mountNode}-iframe`;
      let soundcloudIframe = document.getElementById(soundcloudIframeId);
      if (!soundcloudIframe) {
        soundcloudIframe = document.createElement('iframe');
        soundcloudIframe.id = soundcloudIframeId;
        soundcloudIframe.width = '100%';
        soundcloudIframe.height = '100%';
        soundcloudIframe.setAttribute('frameborder', 'no');
        soundcloudIframe.setAttribute('scrolling', 'no');
        const DEFAULT_SONG = 'https://soundcloud.com/tycho/apogee';
        soundcloudIframe.src = `https://w.soundcloud.com/player/?url=${DEFAULT_SONG}`;
        soundcloudMount.appendChild(soundcloudIframe);
        this.sink$.onNext({ type: EVENTS.EXTERNAL_IFRAME_READY });
      }
      const SC_EVENTS = window.SC.Widget.Events;
      this.player = window.SC.Widget(soundcloudIframe);  // eslint-disable-line
      this.player.bind(SC_EVENTS.READY, () => {
        this.sink$.onNext({ type: EVENTS.PLAYER_READY });
      });
    };

    require(['./contrib/soundcloud.js'], () => {
      this.sink$.onNext({ type: EVENTS.EXTERNAL_SCRIPT_READY });
      initializeSoundcloud();
    });
  }

  _subscribeToPlay() {
    this.source$
      .filter(event => event.type === EVENTS.COMMAND_PLAY)
      .subscribe(event => {
        if (this.player) {
          this.player.load(event.payload.url, { callback: () => {
            this.player.play();
          }});
        }
      });
  }

  _subscribeToPause() {
    this.source$
      .filter(event => event.type === EVENTS.COMMAND_PAUSE)
      .subscribe(() => {
        if (this.player) {
          this.player.pause();
        }
      });
  }

  _subscribeToUnpause() {
    this.source$
      .filter(event => event.type === EVENTS.COMMAND_UNPAUSE)
      .subscribe(() => {
        if (this.player) {
          this.player.play();
        }
      });
  }
}

export class PlayerContainer {
  constructor(options = {}) {
    const { youtubeNode, soundcloudNode } = {
      ...options,
      youtubeNode: 'youtube-mount',
      soundcloudNode: 'soundcloud-mount'
    };

    this.activePlayer = null;
    this.youtubePlayer = new YoutubePlayer({ mountNode: youtubeNode });
    this.soundcloudPlayer = new SoundcloudPlayer({ mountNode: soundcloudNode });
  }

  initialize() {
    this.youtubePlayer.initialize();
    this.soundcloudPlayer.initialize();
  }

  play(url) {
    if (isYoutube(url)) {
      this.activePlayer = this.youtubePlayer;
      this.activePlayer.play(url);
    } else if (isSoundcloud(url)) {
      this.activePlayer = this.soundcloudPlayer;
      this.activePlayer.play(url);
    }
  }

  pause() {
    this.youtubePlayer.pause();
    this.soundcloudPlayer.pause();
  }

  unpause() {
    if (this.activePlayer) {
      this.activePlayer.unpause();
    }
  }
}
