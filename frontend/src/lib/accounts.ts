let currentAccount = null;
export default function handleAccountsChanged(accounts) {
    console.log("trying to change accounts")
    if (accounts.length === 0) {
        console.log('Please connect to metamask');
    } else if (accounts[0] !== currentAccount) {
        currentAccount = accounts[0];
        console.log('Account changed successfully')
        // Do other work!
    }
}

declare let ethereum:any;

export function connect() {
    console.log("trying to connect")

    ethereum
        .request({ method: 'eth_requestAccounts' })
        .then(accounts => {
            handleAccountsChanged(accounts)
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
// While you are awaiting the call to eth_requestAccounts, you should disable
// any buttons the user can click to initiate the request.
// MetaMask will reject any additional requests while the first is still
// pending.