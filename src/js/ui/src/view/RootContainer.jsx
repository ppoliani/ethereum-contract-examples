import {Provider} from 'react-redux';
import React, { Component } from 'react';
import Router from './core/Router';

class Root extends Component {
  render() {
    return (
      <Provider store={this.props.store}>
        <Router />
      </Provider>
    );
  }
}

export default Root;
