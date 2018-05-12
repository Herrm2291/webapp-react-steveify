import React, { Component } from 'react';
import './Track.css';

class Track extends Component {
  render() {
    return (
      <div className="Track">
        <div className="Track-information">
          <h3>/* track name will go here */</h3>
          <p>/* track artist will go here*/ | /* track album will go here */</p>
        </div>
        <a className="Track-action">/* + or - will go here */</a>
      </div>
    );
  }
    /* ternary operator used to reduce code of this if/else statement which displays a + or a - dependant on the boolean return value from this.props.isRemoval */
    renderAction() {
      return <a className="Track-action">{this.props.isRemoval ? '-' : '+'}</a>;
    }
  }

export default Track;

