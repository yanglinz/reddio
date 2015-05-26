'use strict';

import _ from 'lodash';
import React from 'react';
import Marty from 'marty';
import SongsStore from '../stores/songsStore.js';
import SongsQuery from '../actions/songsQuery.js';
import PlayerAction from '../actions/playerAction';
import Button from './common/button.js';

class Song extends React.Component {
  render() {
    return (
      <div className="song">
        <header className="song__header wrap">
          <div className="song__thumbnail wrap">
            <img className="thumbnail" src={this.props.song.thumbnail}></img>
          </div>
        </header>

        <div className="song__content wrap">
          <div className="song__tile wrap">
            <h3 className="title title--song-title">{this.props.song.title}</h3>
          </div>

          <div className="song__meta wrap">
            <p className="meta meta--song-score">{this.props.song.score}</p>
            <p className="meta meta--song-time">{this.props.song.timeCreated}</p>
          </div>
        </div>

        <footer className="song__footer wrap">
          <p onClick={this.playSong.bind(this)}>Play song</p>
        </footer>
      </div>
    );
  }

  playSong() {
    PlayerAction.playSong(this.props.song);
  }
}

class SongsList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      listType: 'hot'
    };
  }

  render() {
    return (
      <div className="songs">
        {this.props.songs.map(function (song, i) {
          return (
            <Song song={song} key={i}></Song>
          );
        })}
        <Button>
          <div onClick={this.fetchSongs.bind(this)}>Load more</div>
        </Button>
      </div>
    );
  }

  fetchSongs() {
    const last = _.last(this.props.songs) || {};
    SongsQuery.fetchSongs(this.state.listType, last.name);
  }
}

let SongsListContainer = Marty.createContainer(SongsList, {
  listenTo: SongsStore,
  fetch: {
    songs() {
      return SongsStore.getSongs();
    }
  }
});

export default SongsListContainer;
