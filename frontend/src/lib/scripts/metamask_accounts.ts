declare let ethereum: any;
import { writable, get } from "svelte/store";
import user from "./user";
export const connectSignal = writable({isConnected: false, account: null});

export let userStore = writable({})

export const accountsObj = {
    currentAccount: null,
    setCurrentAccount(_currAcc) {
        accountsObj.currentAccount = _currAcc;
    },
    handleAccountsChanged: function(accounts) {
        console.log("trying to change accounts")
        if (accounts.length === 0) {
            console.log('Please connect to metamask');
            connectSignal.set({isConnected: false, account: accountsObj.currentAccount})
        } else if (accounts[0] !== accountsObj.currentAccount) { // do nothing if it equals null
            accountsObj.currentAccount = accounts[0];
            connectSignal.set({isConnected: true, account: accountsObj.currentAccount})
            console.log('Account changed successfully');
            // const thisUser = new user();
            userStore.set(new user());
        }
        return null
    },
    connect: function() {
        console.log("trying to connect")
        ethereum
            .request({ method: 'eth_requestAccounts' }) // returns single string
            .then(accounts => {
                accountsObj.handleAccountsChanged(accounts)
                connectSignal.set({isConnected: true, account: accountsObj.currentAccount})
            })
            .catch((err) => {
                if (err.code === 4001) {
                    // EIP-1193 userRejectedRequest error
                    // If this happens, the user rejected the connection request.
                    console.log('Please connect to MetaMask.');
                } else {
                    console.error(err);
                }
            });
    }

}