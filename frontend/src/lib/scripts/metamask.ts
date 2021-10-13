import detectEthereumProvider from '@metamask/detect-provider';
import type user from './user'
import { accountsObj } from './metamask_accounts';
import type { ethers } from 'ethers';
declare let ethereum: any;

export default async function handleMetamask(): Promise<user> {
    // Detect the MetaMask Ethereum provider
    const provider = await detectEthereumProvider();

    // Handle chain (network) and chainChanged
    // TODO take await out when finished debugging
    const chainId = await ethereum.request({ method: 'eth_chainId' })
    console.log("change id is ", chainId)
    ethereum.on('chainChanged', handleChainChanged);

    
    // if(accountsObj.currentAccount == null){ // only connect the first time
        await accountsObj.connect()
    // }
    
    // start the app
    if (provider) {
        if (provider !== window.ethereum) { // If the provider returned by detectEthereumProvider is not the same as window.ethereum. Something is overriding it, perhaps another wallet
            alert("Do you have multiple wallets installed? Something is overriding the window.ethereum injection.")
        }
        
        /**
         * @dev this placement guarantees that the provider is valid, so we can create a user in handleaccounts
         */
        ethereum.on("accountsChanged", accountsObj.handleAccountsChanged); // automatically binds accounts paramter
        return ethereum
            .request({ method: 'eth_accounts' })
            .then(accounts => accountsObj.handleAccountsChanged(accounts))
            .catch((err) => {
                // Some unexpected error.
                // For backwards compatibility reasons, if no accounts are available,
                // eth_accounts will return an empty array.
                console.error(err);
            });
        
    } else {
        alert('Please install MetaMask!')
        return
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