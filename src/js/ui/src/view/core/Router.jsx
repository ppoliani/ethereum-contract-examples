import React, {Component} from 'react'
import {connect} from 'react-redux'
import {BrowserRouter as Router} from 'react-router-dom'
import RouterConnection from '../../bridge/RouterConnection'
import PrivateRoute from './PrivateRoute'
import Home from '../pages/Home'
import Proof from '../pages/Proof'

class RouterComponent extends Component {
  render() {
    return (
      <Router>
        <div style={{height: '100%'}}>
          <PrivateRoute exact path="/" component={Home}/>
          <PrivateRoute exact path="/proof" component={Proof}/>
        </div>
      </Router>
    )
  }
}

export default RouterConnection(RouterComponent)
