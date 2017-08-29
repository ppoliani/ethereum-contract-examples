import {Map} from 'immutable'
import {handleActions} from 'redux-actions'
import Maybe from 'folktale/maybe'
import {SET_WEB3_PROVIDER, SET_WEB3_INSTANCE, SET_MAIN_ACCOUNT} from './web3Actions'

const handleSetWeb3Provider = (state, action) => state.set('provider',  Maybe.fromNullable(action.payload));
const handleSetWeb3Instance = (state, action) => state.set('instance',  Maybe.fromNullable(action.payload));
const handleSetMainAccount = (state, action) => state.set('mainAccount',  Maybe.fromNullable(action.payload));

const Web3Model = Map({
  provider: Maybe.Nothing(),
  instance: Maybe.Nothing(),
  mainAccount: Maybe.Nothing()
});

export default handleActions({
  [SET_WEB3_PROVIDER]: handleSetWeb3Provider,
  [SET_WEB3_INSTANCE]: handleSetWeb3Instance,
  [SET_MAIN_ACCOUNT]: handleSetMainAccount
}, Web3Model);
