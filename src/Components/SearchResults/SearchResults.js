import React, {Component} from 'react';
import './SearchResults.css';
import TrackList from '../TrackList/TrackList';

class SearchResults extends Component {
  render() {
    return (
      <div className="SearchResults">
        <h2>Search Results</h2>
        {/* isRemovable set to false so that the option to add (+ sign) to playlist will be presented
        Passing the addTrack method from App.js via the onAdd attribute
        Passing the state of searchResults from App.js to the TrackList component via the tracks attribute
        */}
        <TrackList
          isRemovable={false}
          onAdd={this.props.onAdd}
          tracks={this.props.searchResults} />
      </div>
    );
  }
}

export default SearchResults;

