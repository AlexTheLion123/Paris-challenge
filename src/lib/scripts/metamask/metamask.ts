import detectEthereumProvider from '@metamask/detect-provider';
import { AccountManager } from '../Classes/AccountManager';
import { LoanContractObj } from '../Classes/LoanContractObj';

declare let ethereum: any;

export default async function handleMetamask() {
    // Detect the MetaMask Ethereum provider
    const provider = await detectEthereumProvider();

    // Handle chain (network) and chainChanged
    const chainId = ethereum.request({ method: 'eth_chainId' }) // ANCHOR await used to be here
    ethereum.on('chainChanged', handleChainChanged);

    await AccountManager.connect();

    // start the app
    if (provider) {
        if (provider !== window.ethereum) { // If the provider returned by detectEthereumProvider is not the same as window.ethereum. Something is overriding it, perhaps another wallet
            alert("Do you have multiple wallets installed? Something is overriding the window.ethereum injection.");
            throw new Error("User may have multiple wallets installed")
        }

        /**
         * @dev this placement guarantees that the provider is valid, so we can create a user in handleaccounts
         */

        ethereum.on("accountsChanged", AccountManager.handleAccountsChanged); // automatically binds accounts paramter

        LoanContractObj.initialize()
            .then(() => LoanContractObj.updateLoans())

        ethereum // have to await this because handleAccountsChanged will load the loan contract
            .request({ method: 'eth_accounts' })
            .then(accounts => AccountManager.handleAccountsChanged(accounts))
            .catch((err) => {
                console.error(err);
            })
    } else {
        alert('Please install MetaMask!')
        throw new Error("No metamask installed");
    }
}

function handleChainChanged(_chainId) {
    // handling this can be complex, best to just reload
    window.location.reload();
}


// TODO
// While you are awaiting the call to eth_requestAccounts, you should disable
// any buttons the user can click to initiate the request.
// MetaMask will reject any additional requests while the first is still
// pending.