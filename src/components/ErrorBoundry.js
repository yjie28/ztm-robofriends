import React, { Component } from 'react';

class ErrorBoundry extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false
    };
  }

  componentDidCatch(error, info) {
    this.setState({ hasError: true });
  }

  // wrap the CardList component with ErrorBoundry component, so when CardList fail to render, it catches it;
  render() {
    if (this.state.hasError) {
      return <h1>Oops. Something's not right.. </h1>;
    }
    return this.props.children;
  }
}

export default ErrorBoundry;
