var React = require('react');
var Marty = require('marty');
var SongsStore = require('../stores/songsStore.js');
var SongsQuery = require('../actions/songsQuery.js');
var Button = require('./common/button.js');

var Song = React.createClass({
  render: function () {
    return (
      <div className="song">
        <p>{this.props.song.title}</p>
      </div>
    );
  }
});

var SongsList = React.createClass({
  render: function () {
    return (
      <div className="songs">
        {this.props.songs.map(function (song) {
          return (
            <Song song={song}></Song>
          );
        })}
        <Button>
          <div onClick={this.fetchSongs}>Load more</div>
        </Button>
      </div>
    );
  },

  fetchSongs: function () {
    SongsQuery.fetchSongs('hot');
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
