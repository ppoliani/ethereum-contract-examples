import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import reducer from './reducer'
import taskMiddleware from '../middlewares/taskMiddleware'

// create a store that has redux-thunk middleware enabled
const createStoreWithMiddleware = applyMiddleware(
  taskMiddleware,
  thunk
)(createStore);

export default () => createStoreWithMiddleware(reducer, );
