import React, {Component} from 'react'
import {Route} from 'react-router-dom'
import AuthGuard from './AuthGuard'
import Layout from './Layout';

export default ({component: Component, ...rest}) =>
  <Route {...rest} render={props => <AuthGuard {...props} component={Layout(Component, props)} /> }/>
