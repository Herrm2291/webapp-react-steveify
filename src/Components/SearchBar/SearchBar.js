import React, {Component} from 'react';
import './SearchBar.css';

class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      term: ''
    };
    this.search = this.search.bind(this);
    this.handleTermChange = this.handleTermChange.bind(this);
  }

  /* search passes the state of the term to the onSearch props */
  search() {
    this.props.onSearch(this.state.term)
  }

  /* handleTermChange accepts an event that is triggered by an onChange attribute and sets the state of the search bars term to the value of the event */
  handleTermChange(e) {
    this.setState({term: e.target.value});
  }

  render() {
    return (
      <div className="SearchBar">
        {/* Passing the handleTermChange method via the onChange attribute */}
        <input onChange={this.handleTermChange} placeholder="Enter A Song, Album, or Artist"/>
        {/* Passing the search method via the onClick attribute */}
        <a onClick={this.search}>SEARCH</a>
      </div>
    );
  }
}

export default SearchBar;

