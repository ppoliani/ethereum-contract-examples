import React from 'react'
import {render} from 'react-dom'
import {AppContainer} from 'react-hot-loader'
import '../services/fn'
import RootContainer from './RootContainer'
import configureStore from '../data'
import './index.html'
import './app.scss'

const bootstrap = Component => {
  render(
    <AppContainer>
      <Component store={configureStore()}/>
    </AppContainer>,
    document.getElementById('root')
  );
}

bootstrap(RootContainer);

if (module.hot) {
  module.hot.accept('./RootContainer', () => {
    const NextRootContainer = require('./RootContainer');
    bootstrap(NextRootContainer);
  });
}
