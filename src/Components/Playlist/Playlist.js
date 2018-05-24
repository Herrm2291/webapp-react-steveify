import React, {Component} from 'react';
import './Playlist.css';
import TrackList from '../TrackList/TrackList'

class Playlist extends Component {
  constructor(props) {
    super(props);
    this.handleNameChange = this.handleNameChange.bind(this);
  }

  /* handleNameChange accepts an event that is triggered by an onNameChange attribute in the App.js Playlist component which updates the input elements defaultValue */
  handleNameChange(e) {
    this.props.onNameChange(e.target.value);
  }

  render() {
    return (
      <div className="Playlist">
				{/* Passing the handleNameChange method via the onChange attribute
				Default value for the input field used to name playlist */}
        <input onChange={this.handleNameChange} defaultValue={'New Playlist'} />
        {/* isRemovable set to true so that the option to remove (- sign) from playlist will be presented
        Passing the removeTrack method from App.js via the onRemove attribute
        Passing the playlist tracks from the playlistTracks array in App.js to the TrackList component via the tracks attribute */}
        <TrackList
          isRemovable={true}
          onRemove={this.props.onRemove}
          tracks={this.props.playlistTracks} />
        {/* Passing the savePlaylist method from App.js via the onClick attribute */}
        <a className="Playlist-save" onClick={this.props.onSave}>SAVE TO SPOTIFY</a>
      </div>
    );
  }
}

export default Playlist;

