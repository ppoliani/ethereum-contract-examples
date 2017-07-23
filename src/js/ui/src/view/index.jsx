import React from 'react';
import {render} from 'react-dom';
import {AppContainer} from 'react-hot-loader';
import RootContainer from './RootContainer';
import configureStore from '../data';

const bootstrap = Component => {
  render(
    <AppContainer>
      <Component store={configureStore()}/>
    </AppContainer>,
    document.getElementById('app')
  );
}

bootstrap(RootContainer);

if (module.hot) {
  module.hot.accept('./RootContainer', () => {
    const NextRootContainer = require('./RootContainer');
    bootstrap(NextRootContainer);
  });
}
