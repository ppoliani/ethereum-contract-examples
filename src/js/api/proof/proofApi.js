const promisify = require('pify');
const {HttpError} = require('../core/api');

const sendTransaction = async (web3, proofContract, ctx, next) => {
  const {filehash, owner} = ctx.query;
  const sendTransaction = promisify(proofContract.set.sendTransaction);
  const options = {
    from: web3.eth.accounts[0]
  }

  try{
    const transactionHash = await sendTransaction(owner, filehash, options);
    ctx.body = {transactionHash};
  }
  catch(error) {
    ctx.body = HttpError(500, 'Error');
  }
}

const getInfo = async (proofContract, ctx, next) => {
  const {filehash} = ctx.query;
  const details = proofContract.get.call(filehash);
  ctx.body = {details};
}

module.exports = {sendTransaction, getInfo};
