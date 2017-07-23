import React, { Component } from 'react'
import HomeConnection from '../../bridge/HomeConnection'

class Home extends Component {
  render() {
    return (
      <div className='page'>
        <h1>Ethereum Proof Smart Contract</h1>
      </div>
    );
  }
}


export default HomeConnection(Home);
