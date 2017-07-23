const getWeb3 = require('../index');

module.exports = () => {
  const web3 = getWeb3();
  return web3.eth.contract([{"constant":false,"inputs":[{"name":"filehash","type":"string"}],"name":"get","outputs":[{"name":"timestamp","type":"uint256"},{"name":"owner","type":"string"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"owner","type":"string"},{"name":"filehash","type":"string"}],"name":"set","outputs":[],"payable":false,"type":"function"},{"anonymous":false,"inputs":[{"indexed":false,"name":"status","type":"bool"},{"indexed":false,"name":"timestamp","type":"uint256"},{"indexed":false,"name":"owner","type":"string"},{"indexed":false,"name":"filehash","type":"string"}],"name":"logFileAddedStatus","type":"event"}]);
}
