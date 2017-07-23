import React, {Component} from 'react';
import {Grid} from 'react-flexbox-grid';
import AppBar from 'material-ui/AppBar';
import Button from 'material-ui/FlatButton';
import IconButton from 'material-ui/IconButton';
import MenuIcon from 'material-ui-icons/Menu';

export default class Header extends Component {
  render() {
    return (
      <AppBar
        title="Investrackr"
        onLeftIconButtonTouchTap={}
        iconElementRight={<Button>Logout</Button>} />
    );
  }
}
