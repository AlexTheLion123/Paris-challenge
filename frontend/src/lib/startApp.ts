import { ethers } from 'ethers';

export default function startApp(_provider) {
    // If the provider returned by detectEthereumProvider is not the same as window.ethereum. Something is overriding it, perhaps another wallet
    if (_provider !== window.ethereum) {
        alert("Do you multiple wallets installed?")
    }

    // Access the decentralizd web via metamask!
    const prov = new ethers.providers.Web3Provider(window.ethereum);
    const signer = prov.getSigner();

    const loan_address = process.env.LOAN_ADDRESS;
    console.log(loan_address)
}