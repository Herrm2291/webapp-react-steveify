import React, {Component} from 'react';
import './Track.css';

class Track extends Component {
  constructor(props) {
    super(props);
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
  }

  /* Handler for renderAction addTrack onClick event to pass this.props.track up to the App component */
  addTrack() {
    this.props.onAdd(this.props.track);
  }

  /* Handler for renderAction removeTrack onClick event to pass this.props.track up to the App component */
  removeTrack() {
    this.props.onRemove(this.props.track);
  }

  render() {
    return (
      <div className="Track">
        <div className="Track-information">
          <h3>{this.props.track.name}</h3>
          <p>{this.props.track.artist} | {this.props.track.album}</p>
        </div>
        {this.renderAction()}
      </div>
    );
  }

  /* Displays a + sign or a - sign dependent on the boolean return value from this.props.isRemovable */
  renderAction() {
    if (this.props.isRemovable) {
      return <a className="Track-action" onClick={this.removeTrack}>-</a>;
    }
    return <a className="Track-action" onClick={this.addTrack}>+</a>;
  }
}

export default Track;

