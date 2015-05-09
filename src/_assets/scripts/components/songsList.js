var React = require('react');
var Marty = require('marty');
var SongsStore = require('../stores/songsStore.js');
var SongsQuery = require('../actions/songsQuery.js');
var Button = require('./common/button.js');

var SongsList = React.createClass({
  render: function () {
    return (
      <div className="songs-list">
        {this.props.songs.map(function (song) {
          return (<p>{song}</p>);
        })}
        <Button onClick={this.fetchSongs} >Load more</Button>
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
