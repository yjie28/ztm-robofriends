import React, { Component } from 'react';
import { connect } from 'react-redux';
import CardList from '../components/CardList';
import SearchBox from '../components/SearchBox';
// import { robots } from './robots';
import Scroll from '../components/Scroll';
import ErrorBoundry from '../components/ErrorBoundry';
import './App.css';

import { setSearchField, requestRobots } from '../actions';

const mapStateToProps = state => {
  return {
    searchField: state.searchRobots.searchField,
    robots: state.requestRobots.robots,
    isPending: state.requestRobots.isPending,
    error: state.requestRobots.error
  };
};

// dispatch - triggers action; dispatch into the reducer; to send action
const mapDispatchToProps = dispatch => {
  return {
    onSearchChange: event => dispatch(setSearchField(event.target.value)),
    onRequestRobots: () => dispatch(requestRobots())
  };
};

// to write a class: import Component - has access to render() method

// state
// const state = {
//   robots: robots,
//   searchfield: ''
// };

// Mounting - replacing root with App;

// this is a smart component; classes have access to state
class App extends Component {
  // constructor() {
  //   super(); // calls constuctor of Component, which gives access to this.state
  //   this.state = {
  //     //robots: robots, | robots should be empty array instead of hard coded data
  //     robots: [] // property
  //     // searchfield: '' // property
  //   };
  // } // saving searchfield as a state so we can use it (for filtering, in this case)

  // one of the life cycle method
  componentDidMount() {
    // updated the state; it runs render again

    // fetch is a part of window object
    // fetch('https://jsonplaceholder.typicode.com/users') // make an API request, a promise gets returned
    //   .then(response => response.json()) // convert it to JSON object (which is another promise)
    //   .then(users => this.setState({ robots: users }));

    this.props.onRequestRobots();
  }

  // arrow functions - binds automatically...
  // onSearchChange = e => {
  //   // can only modify state through this method; never this.state.xx = xx, goes back to the idea of one direction data flow
  //   this.setState({ searchfield: e.target.value }); // one of the Component method
  // };

  render() {
    // const { robots } = this.state; // object destructuring
    const { searchField, onSearchChange, robots, isPending } = this.props;
    const filteredRobots = robots.filter(robot => {
      return robot.name
        .toLocaleLowerCase()
        .includes(searchField.toLocaleLowerCase());
    });

    // the "key" makes it easier for react to update information in the future if it happens, without re-redering everything
    // robots.map(robot =>  <h1 key={robot.id}>{robot.name}</h1>);

    // if robots.length === 0
    // return !robots.length ? (

    return isPending ? (
      <h1>Loading</h1>
    ) : (
      <div className="tc">
        <h1 className="f1">RoboFriends</h1>
        <SearchBox searchField="search robots" searchChange={onSearchChange} />
        <Scroll>
          <ErrorBoundry>
            <CardList robots={filteredRobots} />
          </ErrorBoundry>
        </Scroll>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
// connect - higher order functions
