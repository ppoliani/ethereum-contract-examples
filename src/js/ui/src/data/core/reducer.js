import {combineReducers} from 'redux'
import searchReducer from '../search/searchReducer'
import proofReducer from '../proof/proofReducer'
import petReducer from '../pet/petReducer'
import web3Reducer from '../web3/web3Reducer'

export default combineReducers({
  search: searchReducer,
  proof: proofReducer,
  pet: petReducer,
  web3: web3Reducer
});
