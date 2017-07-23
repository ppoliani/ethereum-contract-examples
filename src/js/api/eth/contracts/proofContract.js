const proofContract = require('../abi/proofAbi');
const listen = require('../events/proofEvents');

module.exports = () => proofContract.at('0x8a1DE2235d0Ec3D67b76a543F3AC1Db660226590');

