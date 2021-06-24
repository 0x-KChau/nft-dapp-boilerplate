var ContractNFT = artifacts.require("../contracts/NFT.sol");

module.exports = function(deployer) {
  deployer.deploy(ContractNFT);
};
