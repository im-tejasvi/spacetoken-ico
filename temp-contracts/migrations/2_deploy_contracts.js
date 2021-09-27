const PeaceToken = artifacts.require("./PeaceToken.sol");

module.exports = function (deployer) {
  deployer.deploy(PeaceToken, 1000000);
};
