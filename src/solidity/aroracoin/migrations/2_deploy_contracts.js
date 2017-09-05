const AroraToken = artifacts.require("./AroraToken.sol");

module.exports = function(deployer) {
  deployer.deploy(AroraToken);
};
