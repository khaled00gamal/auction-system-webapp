export const handler = (web3) => async () => {
  console.log('in getAccount, web3 is', web3);
  // if (web3 == null) return;
  const accounts = await web3.eth.getAccounts();
  const account = accounts[0];

  if (!account) {
    throw new Error('Cannot retreive an account. Please refresh the browser.');
  }

  console.log('account', account);
  return account;
};
