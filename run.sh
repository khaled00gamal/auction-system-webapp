echo "Make sure you have ganache ready and that npm has all the correct packages installed..."

cd contracts
zsh -c 'truffle migrate --reset'
cp build/contracts/SealedBidAuctionManager.json ../client/src/contract/

cd ../client
npm start
