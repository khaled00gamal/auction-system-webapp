import Web3 from "web3";
import contractAbi from "./SealedBidAuctionManager.json";

const web3 = new Web3("http://localhost:7545");
const contractAddress = "0x13B8819E8D32E078D7A70447FF535b67A708e749";
const contract = new web3.eth.Contract(contractAbi.abi, contractAddress);

export { contract };
