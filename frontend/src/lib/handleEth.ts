import detectEthereumProvider from '@metamask/detect-provider';
import startApp from './startApp';
import handleAccountsChanged from './accounts'
import { connect } from './accounts'
declare let ethereum: any;

export default async function handleEthereum() {
    // Detect the MetaMask Ethereum provider
    const provider = await detectEthereumProvider();

    if (provider) {
        startApp(provider)
    } else {
        alert('Please install MetaMask!')
    }

    // Handle chain (network) and chainChanged
    const chainId = await ethereum.request({ method: 'eth_chainId' })
    console.log(chainId)
    ethereum.on('chainChanged', handleChainChanged);

    // Handle user accounts and accountsChanged
    ethereum
        .request({ method: 'eth_accounts' })
        .then(handleAccountsChanged)
        .catch((err) => {
            // Some unexpected error.
            // For backwards compatibility reasons, if no accounts are available,
            // eth_accounts will return an empty array.
            console.error(err);
        });
    ethereum.on("accountsChanged", handleAccountsChanged)
    
    connect()
}

function handleChainChanged(_chainId) {
    // handling this can be complex, best to just reload
    window.location.reload();
}



