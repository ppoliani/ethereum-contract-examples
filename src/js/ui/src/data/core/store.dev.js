import {createStore, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import taskMiddleware from '../middlewares/taskMiddleware'
import reducer from './reducer'

const createDevStoreWithMiddleware = applyMiddleware(
  taskMiddleware,
  thunk
)(createStore);

const configureStore = () => {
  const store = createDevStoreWithMiddleware(
    reducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  );

  // enable webpack hot module replacement for reducers
  if (module.hot) {
    module.hot.accept('./reducer', () => {
      const nextRootReducer = require('./reducer');
      store.replaceReducer(nextRootReducer);
    });
  }

  return store;
}

export default configureStore;
