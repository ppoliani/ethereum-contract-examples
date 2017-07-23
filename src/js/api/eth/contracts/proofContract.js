const proofAbi = require('../abi/proofAbi');
const listen = require('../events/proofEvents');
const contract = proofAbi().at('0xb5b66f236320efaf7efd53bf81c1ea626f98958c');

listen(contract);

module.exports = () => contract

