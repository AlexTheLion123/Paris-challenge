import detectEthereumProvider from '@metamask/detect-provider';
import user from './startUser';
import { accountsObj } from './metamask_accounts';
import type { ethers } from 'ethers';
declare let ethereum: any;

export default async function handleMetamask() {
    // Detect the MetaMask Ethereum provider
    const provider = await detectEthereumProvider();

    // Handle chain (network) and chainChanged
    const chainId = await ethereum.request({ method: 'eth_chainId' })
    console.log(chainId)
    ethereum.on('chainChanged', handleChainChanged);

    // Handle user accounts and accountsChanged
    ethereum
        .request({ method: 'eth_accounts' })
        .then(accounts => accountsObj.handleAccountsChanged(accounts))
        .catch((err) => {
            // Some unexpected error.
            // For backwards compatibility reasons, if no accounts are available,
            // eth_accounts will return an empty array.
            console.error(err);
        });

    accountsObj.connect()

    // start the app
    if (provider) {
        ethereum.on("accountsChanged", accountsObj.handleAccountsChanged); // automatically binds accounts paramter

        if (provider !== window.ethereum) { // If the provider returned by detectEthereumProvider is not the same as window.ethereum. Something is overriding it, perhaps another wallet
            alert("Do you have multiple wallets installed? Something is overriding the window.ethereum injection.")
        }
        
        return new user(provider as ethers.providers.Web3Provider);
    } else {
        alert('Please install MetaMask!')
    }

    function handleChainChanged(_chainId) {
        // handling this can be complex, best to just reload
        window.location.reload();
    }
}

// While you are awaiting the call to eth_requestAccounts, you should disable
// any buttons the user can click to initiate the request.
// MetaMask will reject any additional requests while the first is still
// pending.