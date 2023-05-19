// FIXME remove all unnecessary files
// FIXME configure truffle builds to the correct path

import Web3 from "web3";
import contractAbi from "./contract/SealedBidAuctionManager.json";
// import BigNumber from 'bignumber.js';

const web3 = new Web3("http://localhost:7545");
// const contractAddress = "0x13B8819E8D32E078D7A70447FF535b67A708e749";
const contractAddress = "0x9fEC57C6b47663C0Decc8C68A5623De08ac26173";
const contract = new web3.eth.Contract(contractAbi.abi, contractAddress);

// const contract = await SealedBidAuctionManager.deployed();

contract.getNumberOfRegisteredAuctions = function () {
  // try {
  return contract.methods.getNumberOfRegisteredAuctions().call();
  // console.log('result:', res);
  // } catch (e) {
  //     console.error('error:', e);
  // }
};

contract.createAuction = function (obj) {
  web3.eth.getAccounts().then((r) => console.log(r));
  // console.log(seller);
  // const bn = new BigNumber(endDate);
  // console.log(bn);
  return contract.methods.createAuction(obj).call(); // FIXME metamask?
};

export { contract };
