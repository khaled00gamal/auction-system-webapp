const accounts = await web3.eth.getAccounts();
const contract = await SealedBidAuctionManager.deployed();
const view = await contract.getAuctionData(1);
const auctionInfo = {
  owner: accounts[1],
  securityDeposit: 1,
  biddingStart: 1680904800,
  revealStart: 1683583200,
  revealEnd: 1683669600,
  itemName: "Graduation",
  itemDesc: "Wanna graduate?",
};
const auction = await contract.createAuction(auctionInfo, {
  from: accounts[2],
});
