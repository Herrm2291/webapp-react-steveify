import React, {Component} from 'react';
import './App.css';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';
import Spotify from '../../util/Spotify.js';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      /* The empty searchResults and playlistTracks arrays will contain name, artist, album and id properties */
      searchResults: [],
      playlistName: 'New Playlist',
      playlistTracks: []
    };
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.search = this.search.bind(this);
  }

  /* addTrack uses the track's id property to check if the current song is in the playlistTracks state and if the id is new, adds the song to the end of the playlist then sets the new state of the playlist */
  addTrack(track) {
    if (!this.state.playlistTracks.find(savedTrack => savedTrack.id === track.id)) {
      let updatedTracks = this.state.playlistTracks.concat(track);
      this.setState({playlistTracks: updatedTracks});
    }
  }

  /* removeTrack uses the track's id property to filter it out of playlistTracks state then sets the new state of the playlist */
  removeTrack(track) {
    let tracks = this.state.playlistTracks;
    tracks = tracks.filter(currentTrack => currentTrack.id !== track.id);
    this.setState({playlistTracks: tracks});
  }

  /* updatePlaylistName sets the state of the playlist name to that of the Playlist components input element */
  updatePlaylistName(name) {
    this.setState({playlistName: name});
  }

  /* savePlaylist generates an array of uri values (Spotify resource identifiers) called TrackURIs, from each track in the playlistTracks property */
  savePlaylist() {
    let trackURIs = [this.state.playlistTracks.map(track => track.uri)];
  }

  /* search accepts term as the argument, receives a response from the Spotify API and updates the searchResults state with the results from a Spotify request */
  search(term) {
    Spotify.search(term).then(searchResults => {
      this.setState({searchResults: searchResults});
    });
  }

  render() {
    return (
      <div>
        <h1>Steveify</h1>
        <div className="App">
          {/* Passing the search method via the onSearch attribute */}
          <SearchBar
            onSearch={this.search} />
          <div className="App-playlist">
            {/* Passing the addTrack method via the onAdd attribute
            Passing the state of searchResults to the SearchResults component via the searchResults attribute */}
            <SearchResults
              onAdd={this.addTrack}
              searchResults={this.state.searchResults} />
            {/* Passing the savePlaylist method via the onSave attribute
            Passing the updatePlaylistName method via the onNameChange attribute
            Passing the removeTrack method via the onRemove attribute
            Passing the state of the App component's playlistName and playlistTracks to the Playlist component via the playlistName and playlistTracks attributes */}
            <Playlist
              onSave={this.savePlaylist}
              onNameChange={this.updatePlaylistName}
              onRemove={this.removeTrack}
              playlistName={this.state.playlistName}
              playlistTracks={this.state.playlistTracks} />
          </div>
        </div>
      </div>
    );
  }
}

export default App;

