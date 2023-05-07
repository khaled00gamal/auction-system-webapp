const SealedBidAuctionManager = artifacts.require("SealedBidAuctionManager");

module.exports = function (deployer) {
  deployer.deploy(SealedBidAuctionManager);
};
