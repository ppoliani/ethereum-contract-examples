import React, {Component} from 'react';
import {autobind} from 'core-decorators';
import Paper from 'material-ui/Paper';
import {Grid, Col, Row} from 'react-flexbox-grid';
import Header from './Header';

export default (NestedComponent, props={}) => class LayoutComponent extends Component {
  render() {
    return (
      <div>
        <Header  />
        <div className="main-content">
          <Paper className='main-content__page'>
            <Grid fluid>
              <Row middle="xs">
                <Col xs>
                  <NestedComponent {...props}/>
                </Col>
              </Row>
            </Grid>
          </Paper>
        </div>
      </div>
    );
  }
}
