import React, {Component} from 'react'
import {Redirect} from 'react-router-dom'

class AuthGuard extends Component {
  constructor(props, state) {
    super(props, state);
  }

  state = {
    isAuthenticated: null
  }

  componentDidMount() {
    // TODO: This is the place where you can apply some logic to determine
    // if user is authenticated i.e. read JWT token from the localstorage
    this.setState({isAuthenticated: true});
  }

  render() {
    const Component = this.props.component;

    if(this.state.isAuthenticated === null) {
      // TODO: this is the place were we can add a spinner
      // or something more sophisticated
      return null;
    }

    return this.state.isAuthenticated
      ? <Component />
      : <Redirect to={{
          pathname: '/login',
          state: {
            from: this.props.location
          }
        }}/>
  }
}

export default AuthGuard
