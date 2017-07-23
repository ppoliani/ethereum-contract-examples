const {promisify} = require('util');
const {HttpError} = require('../core/api');

const sendTransaction = async (web3, proofContract, ctx, next) => {
  const {fileHash, owner} = ctx.params;
  const sendTransaction = promisify(proofContract.sendTransaction);
  const options = {
    from: web3.eth.accounts[0]
  }

  try{
    const transactionHash = await sendTransaction(owner, fileHash);
    ctx.body = {transactionHash};
  }
  catch(error) {
    ctx.body = HttpError(500, 'Error');
  }
}

const getInfo = async (proofContract, ctx, next) => {
  const {fileHash} = ctx.params;
  const details = proofContract.get.call(fileHash);
  ctx.body = {details};
}
