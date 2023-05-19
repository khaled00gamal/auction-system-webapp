export const handler = (web3) => async () => {
  const accounts = await web3.eth.getAccounts();
  const account = accounts[0];

  if (!account) {
    throw new Error('Cannot retreive an account. Please refresh the browser.');
  }

  console.log('account', account);
  return account;
};
