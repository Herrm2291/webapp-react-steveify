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
        'id': ''
      }]
    };
  }

  render() {
    return (
      <div>
        <h1>Steveify</h1>
        <div className="App">
          <SearchBar />
          <div className="App-playlist">
          <SearchResults searchResults={this.state.searchResults}/>
          <Playlist />
          </div>
        </div>
      </div>
    );
  }
}

export default App;

