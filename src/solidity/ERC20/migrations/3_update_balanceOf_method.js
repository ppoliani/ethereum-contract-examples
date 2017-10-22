const AroraERC20 = artifacts.require('./AroraERC20.sol');

module.exports = (deployer) => {
  deployer.deploy(AroraERC20, 100000, 'ARORACoin', 'ARC', 2); 
};
