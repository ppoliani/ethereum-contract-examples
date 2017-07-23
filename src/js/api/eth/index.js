const Web3 = require('web3');

let web3 = null;
const get = () => web3 || (web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545")), web3);

module.exports = get;
