const {sendTransaction, getInfo} = require('./proofApi');
const {partial} = require('../helpers/fn');
const proofContract = require('../eth/contracts/proofContract');
const web3 = require('../eth');

const routes = {
  '/proof/send-transaction': {
    method: 'get',
    fn: partial(sendTransaction, web3(), proofContract())
  },

  '/proof/info': {
    method: 'get',
    fn: partial(getInfo, proofContract())
  }
};

module.exports = routes;
