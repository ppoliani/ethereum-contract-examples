import {Map} from 'immutable'
import {handleActions} from 'redux-actions'
import Maybe from 'folktale/maybe'
import {SET_WEB3_PROVIDER, SET_WEB3_INSTANCE} from './web3Actions'

const handleSetWeb3Provider = (state, action) => state.set('provider',  Maybe.fromNullable(action.payload));
const handleSetWeb3Instance = (state, action) => state.set('instance',  Maybe.fromNullable(action.payload));

const Web3Model = Map({
  provider: Maybe.Nothing(),
  instance: Maybe.Nothing()
});

export default handleActions({
  [SET_WEB3_PROVIDER]: handleSetWeb3Provider,
  [SET_WEB3_INSTANCE]: handleSetWeb3Instance
}, Web3Model);
