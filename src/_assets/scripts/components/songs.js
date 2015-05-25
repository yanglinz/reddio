var _ = require('lodash');
var React = require('react');
var Marty = require('marty');
var SongsStore = require('../stores/songsStore.js');
var SongsQuery = require('../actions/songsQuery.js');
var PlayerAction = require('../actions/playerAction');
var Button = require('./common/button.js');

var Song = React.createClass({
  render: function () {
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
          <p onClick={this.playSong}>Play song</p>
        </footer>
      </div>
    );
  },

  playSong: function () {
    PlayerAction.playSong(this.props.song);
  }
});

var SongsList = React.createClass({
  getInitialState: function () {
    return {listType: 'hot'};
  },

  render: function () {
    return (
      <div className="songs">
        {this.props.songs.map(function (song, i) {
          return (
            <Song song={song} key={i}></Song>
          );
        })}
        <Button>
          <div onClick={this.fetchSongs}>Load more</div>
        </Button>
      </div>
    );
  },

  fetchSongs: function () {
    const last = _.last(this.props.songs) || {};
    SongsQuery.fetchSongs(this.state.listType, last.name);
  }
});

module.exports = Marty.createContainer(SongsList, {
  listenTo: SongsStore,
  fetch: {
    songs () {
      return SongsStore.getSongs();
    }
  }
});
