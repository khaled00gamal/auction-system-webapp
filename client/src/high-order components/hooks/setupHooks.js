import { handler as getAccount } from "./getAccount"

export const setupHooks = ({ web3, provider, contract }) => {
    return {
        getAccount: getAccount(web3, provider)
    }
}
