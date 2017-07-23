import {combineReducers} from 'redux'
import searchReducer from '../search/searchReducer'
import proofReducer from '../proof/proofReducer'

export default combineReducers({
  search: searchReducer,
  proof: proofReducer
});
