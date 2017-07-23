const logger = require('../../helpers/logger');

const logFileAddedStatusListener = (error, result) => {
  if(result.args.status) {
    logger.info(result)
  }
}

const listen = proofContract => {
  proofContract.logFileAddedStatus().watch(logFileAddedStatusListener)
}

module.exports = listen;
