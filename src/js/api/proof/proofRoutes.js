const {sendTransaction} = require('./proofApi');
const {partial} = require('../helpers/fn');
const proofContract = require('../eth/contracts/proof');
const web3 = require('../eth');

const routes = {
  '/send-transaction': {
    method: 'get',
    auth: true,
    fn: partial(sendTransaction, web3(), proofContract())
  }
};

module.exports = routes;
