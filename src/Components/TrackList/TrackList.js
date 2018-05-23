import React, {Component} from 'react';
import './TrackList.css';
import Track from '../Track/Track';

class TrackList extends Component {
  render() {
    return (
      <div className="TrackList">
        {/* Using .map here to render each track in the list, passing in the current track as an attribute called 'track' to the Track component
        isRemovable checks the isRemovable props for a boolean value to determine if the option to add (+ sign) or remove (- sign) a track should be presented
        Passing the removeTrack method from Track.js via the onRemove attribute
        Passing the addTrack method from Track.js via the onAdd attribute
        Key attribute used to help React identify which items have changed, are added or removed */}
        {
          this.props.tracks.map(track => {
            return <Track
              isRemovable={this.props.isRemovable}
              onRemove={this.props.onRemove}
              onAdd={this.props.onAdd}
              track={track}
              key={track.id} />
          })
        }
      </div>
    );
  }
}

export default TrackList;

