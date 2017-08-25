import {createAction} from 'redux-actions'
import Web3 from 'web3'
import {partial} from '../../services/fn'

export const SET_WEB3_PROVIDER = 'WEB3::SET_WEB3_PROVIDER';
export const SET_WEB3_INSTANCE = 'WEB3::SET_WEB3_INSTANCE';

const setWeb3Provider = createAction(SET_WEB3_PROVIDER);
const setWeb3Instance = createAction(SET_WEB3_INSTANCE);

export const initWeb3Root = Web3 => dispatch => {
  // Metamask can inject web3; in which case it will be available on the global object
  if (typeof window.web3 !== 'undefined') {
    dispatch(setWeb3Provider(web3.currentProvider))
    dispatch(setWeb3Instance(new Web3(web3.currentProvider)))
  } else {
    provider = new Web3.providers.HttpProvider('http://localhost:8545');
    dispatch(setWeb3Provider(provider))
    dispatch(setWeb3Instance(new Web3(provider)))
  }
}

export const initWeb3 = partial(initWeb3Root, Web3)
