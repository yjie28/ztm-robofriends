import React, { Component } from 'react';
import CardList from '../components/CardList';
import SearchBox from '../components/SearchBox';
// import { robots } from './robots';
import Scroll from '../components/Scroll';
import ErrorBoundry from '../components/ErrorBoundry';
import './App.css';

// state
// const state = {
//   robots: robots,
//   searchfield: ''
// };

// Mounting - replacing root with App;

// smart component; there's state
class App extends Component {
  constructor() {
    super(); // calls constuctor of Component
    this.state = {
      //robots: robots, | robots should be empty array instead of hard coded data
      robots: [],
      searchfield: ''
    };
  }

  componentDidMount() {
    // updated the state; it runs render again

    // fetch is a part of window object
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(response => response.json())
      .then(users => this.setState({ robots: users }));
  }

  onSearchChange = e => {
    // change state this way; never this.state.xx = xx;
    this.setState({ searchfield: e.target.value });
  };

  render() {
    const { robots, searchfield } = this.state;
    const filteredRobots = robots.filter(robot => {
      return robot.name
        .toLocaleLowerCase()
        .includes(searchfield.toLocaleLowerCase());
    });
    // if robots.length === 0

    return !robots.length ? (
      <h1>Loading</h1>
    ) : (
      <div className="tc">
        <h1 className="f1">RoboFriends</h1>
        <SearchBox searchChange={this.onSearchChange} />
        <Scroll>
          <ErrorBoundry>
            <CardList robots={filteredRobots} />
          </ErrorBoundry>
        </Scroll>
      </div>
    );
  }
}

export default App;
