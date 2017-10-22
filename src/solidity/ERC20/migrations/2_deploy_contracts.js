const AroraERC20 = artifacts.require('./AroraERC20.sol');

module.exports = (deployer) => {
  deployer.deploy(AroraERC20, 2000000, 'ARORACoin', 'ARC', 4);
};
