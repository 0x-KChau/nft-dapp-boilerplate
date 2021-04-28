var Shibas = artifacts.require("../contracts/Shibas.sol");

module.exports = function(deployer) {
  deployer.deploy(Shibas);
};
