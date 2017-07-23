const Web3 = require('web3');
const proofContract = require('./abi/proofAbi');

const web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));
const proof = proofContract.at('0x8a1DE2235d0Ec3D67b76a543F3AC1Db660226590');

