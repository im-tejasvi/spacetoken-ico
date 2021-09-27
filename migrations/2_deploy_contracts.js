const SpaceToken = artifacts.require("./SpaceToken.sol");
const SpaceTokenSale = artifacts.require("./SpaceTokenSale.sol");

module.exports = function (deployer) {
  deployer.deploy(SpaceToken, 1000000).then(function () {
    // Token price is 0.001 Ether
    var tokenPrice = 1000000000000000;
    return deployer.deploy(SpaceTokenSale, SpaceToken.address, tokenPrice);
  });
};
