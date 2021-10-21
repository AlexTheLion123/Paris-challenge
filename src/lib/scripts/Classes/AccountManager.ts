declare let ethereum: any;

import { isConnectedStore } from '../stores/accountStores';

export const AccountManager = {
    currentAccount: "",

    setCurrentAccount(_currentAccount) {
        AccountManager.currentAccount = _currentAccount;
        isConnectedStore.set(true);
        console.log('Account changed successfully');
    },

    handleAccountsChanged(accounts) {
        console.log("trying to change accounts")
        if (accounts.length === 0) {
            console.log('Please connect to metamask');
        } else if (accounts[0] !== AccountManager.currentAccount) {
            AccountManager.setCurrentAccount(accounts[0]);
        }
        // return null
    },

    connect() {
        console.log("trying to connect")
        ethereum
            .request({ method: 'eth_requestAccounts' }) // returns single string
            .then(accounts => {
                AccountManager.handleAccountsChanged(accounts)
                isConnectedStore.set(true)
            })
            .catch((err) => {
                if (err.code === 4001) {
                    // EIP-1193 userRejectedRequest error
                    // If AccountManager happens, the user rejected the connection request.
                    console.log('Please connect to MetaMask.');
                } else {
                    console.error(err);
                }
            });
    }
}