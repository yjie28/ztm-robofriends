import React, { Component } from 'react';
import CardList from '../components/CardList';
import SearchBox from '../components/SearchBox';
// import { robots } from './robots';
import Scroll from '../components/Scroll';
import ErrorBoundry from '../components/ErrorBoundry';
import './App.css';

// to write a class: import Component - has access to render() method

// state
// const state = {
//   robots: robots,
//   searchfield: ''
// };

// Mounting - replacing root with App;

// this is a smart component; classes have access to state
class App extends Component {
  constructor() {
    super(); // calls constuctor of Component, which gives access to this.state
    this.state = {
      //robots: robots, | robots should be empty array instead of hard coded data
      robots: [], // property
      searchfield: '' // property
    };
  } // saving searchfield as a state so we can use it (for filtering, in this case)

  // one of the life cycle method
  componentDidMount() {
    // updated the state; it runs render again

    // fetch is a part of window object
    fetch('https://jsonplaceholder.typicode.com/users') // make an API request, a promise gets returned
      .then(response => response.json()) // convert it to JSON object (which is another promise)
      .then(users => this.setState({ robots: users }));
  }

  onSearchChange = e => {
    // can only modify state through this method; never this.state.xx = xx, goes back to the idea of one direction data flow
    this.setState({ searchfield: e.target.value }); // one of the Component method
  };

  render() {
    const { robots, searchfield } = this.state; // object destructuring
    const filteredRobots = robots.filter(robot => {
      return robot.name
        .toLocaleLowerCase()
        .includes(searchfield.toLocaleLowerCase());
    });

    // the "key" makes it easier for react to update information in the future if it happens, without re-redering everything
    // robots.map(robot =>  <h1 key={robot.id}>{robot.name}</h1>);

    // if robots.length === 0
    return !robots.length ? (
      <h1>Loading</h1>
    ) : (
      <div className="tc">
        <h1 className="f1">RoboFriends</h1>
        <SearchBox
          searchfield="search robots"
          searchChange={this.onSearchChange}
        />
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
