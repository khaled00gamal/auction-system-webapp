echo "Make sure you have ganache ready and that npm has all the correct packages installed..."

cd ~/fghdh/auction-system-webapp/client
npm install

cd ../contracts
zsh -c 'truffle migrate --reset' # doesn't work; script fails silently here
# FIXME
cp --overwrite build/contracts/SealedBidAuctionManager.json ../client/src/contract/

cd ../client
npm start
