import {createAction} from 'redux-actions'
import Web3 from 'web3'
import {partial} from '../../services/fn'

export const SET_WEB3_PROVIDER = 'WEB3::SET_WEB3_PROVIDER'
export const SET_WEB3_INSTANCE = 'WEB3::SET_WEB3_INSTANCE'
export const SET_MAIN_ACCOUNT = 'CONTRACT::SET_MAIN_ACCOUNT'

const setMainAccount = createAction(SET_MAIN_ACCOUNT)
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


export const loadMainAccount = () => (dispatch, getState) => {
  const {web3} = getState();

  return new Promise((resolve, reject) => {
    web3.get('instance')
    .matchWith({
      Just: ({value: web3Instance}) => {
        web3Instance.eth.getAccounts((error, accounts) => {
          if(error) return console.error(error)
          dispatch(setMainAccount(accounts[0]))
          resolve();
        });
      },
      Nothing: () => reject('Web3 instance is not present')
    })
  })
}


export const initWeb3 = partial(initWeb3Root, Web3)
