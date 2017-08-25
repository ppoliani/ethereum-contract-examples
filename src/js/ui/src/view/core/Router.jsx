import React, {Component} from 'react'
import {connect} from 'react-redux'
import {BrowserRouter as Router} from 'react-router-dom'
import RouterConnection from '../../bridge/RouterConnection'
import PrivateRoute from './PrivateRoute'
import Home from '../pages/Home'
import Proof from '../pages/Proof'
import PetShop from '../pages/PetShop'

class RouterComponent extends Component {
  // There is no need to update this component once it's been mounted
  shouldComponentUpdate() {
    return false;
  }

  render() {
    return (
      <Router>
        <div style={{height: '100%'}}>
          <PrivateRoute exact path="/" component={Home}/>
          <PrivateRoute exact path="/proof" component={Proof}/>
          <PrivateRoute exact path="/pet" component={PetShop}/>
        </div>
      </Router>
    )
  }
}

export default RouterConnection(RouterComponent)
