import React, { Component } from 'react';
import './App.css';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchResults: [{
        'name': '',
        'artist': '',
        'album': '',
        'id': '',
      }],
        'playlistName': 'My Playlist',
        'playlistTracks': [{
          'name': '',
          'artist': '',
          'album': '',
          'id': ''
        }]
    };
    this.addTrack = this.addTrack.bind(this);
  }

  addTrack(track) {
    if (!this.state.playlistTracks.find(savedTrack => savedTrack.id === track.id)) {
      let updatedTracks = this.state.playlistTracks.concat(track);
      this.setState({ playlistTracks: updatedTracks });
    }
  }

  render() {
    return (
      <div>
        <h1>Steveify</h1>
        <div className="App">
          <SearchBar />
          <div className="App-playlist">
          <SearchResults onAdd={this.addTrack} searchResults={this.state.searchResults}/>
          <Playlist playlistName={this.state.playlistName} playlistTracks={this.state.playlistTracks}/>
          </div>
        </div>
      </div>
    );
  }
}

export default App;

