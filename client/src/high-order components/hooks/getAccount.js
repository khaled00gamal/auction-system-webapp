export const handler = (web3, provider) => async () => {

    // console.log(Object.getOwnPropertyNames(web3));
    const accounts = await web3.eth.getAccounts()
    // console.log(Object.getOwnPropertyNames(web3));
    // console.log(Object.getOwnPropertyNames(web3.eth));
    const account = accounts[0]

    if (!account) {
        throw new Error("Cannot retreive an account. Please refresh the browser.")
    }

    console.log('account', account);
    return account
}