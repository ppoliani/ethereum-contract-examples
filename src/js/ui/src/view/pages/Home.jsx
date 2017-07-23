import React, { Component } from 'react';
import {Map} from 'immutable'
import {autobind} from 'core-decorators'
import HomeConnection from '../../bridge/HomeConnection'

class Home extends Component {
  render() {
    const {counter, search} = this.props;

    return (
      <div className='page'>
        <h1>Ethereum Proof Smart Contract</h1>
      </div>
    );
  }
}


export default HomeConnection(Home);
