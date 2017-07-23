import {Provider} from 'react-redux'
import React, { Component } from 'react'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import {cyan500} from 'material-ui/styles/colors';
import injectTapEventPlugin from 'react-tap-event-plugin'
import Router from './core/Router'

injectTapEventPlugin();

const muiTheme = getMuiTheme({
  palette: {
    textColor: cyan500,
  },
  appBar: {
    height: 50,
  },
});


class Root extends Component {
  render() {
    return (
      <MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>
        <Provider store={this.props.store}>
          <Router />
        </Provider>
      </MuiThemeProvider>
    );
  }
}

export default Root;
