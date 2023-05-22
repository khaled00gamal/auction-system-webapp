echo "Make sure you have ganache ready and that npm has all the correct packages installed..."

cd contracts
truffle migrate --reset
cp build/contracts/SealedBidAuctionManager.json ../client/src/contract/

cd ../client
npm start
