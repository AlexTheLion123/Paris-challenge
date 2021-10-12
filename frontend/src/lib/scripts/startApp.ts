import { ethers } from 'ethers';
import LOAN_ABI from "$lib/abi/contracts/Loan.sol/LoanContract.json";
import type { LoanContract } from '../types';
import { Signer } from "@ethersproject/abstract-signer";
import { accountsObj } from './metamask_accounts';

declare let ethereum:any;

export default function startApp(_provider) {
    ethereum.on("accountsChanged", accountsObj.handleAccountsChanged); // automatically binds accounts paramter

    const LOAN_ADDRESS = '0x5FbDB2315678afecb367f032d93F642f64180aa3'
    
    // If the provider returned by detectEthereumProvider is not the same as window.ethereum. Something is overriding it, perhaps another wallet
    if (_provider !== window.ethereum) {
        alert("Do you have multiple wallets installed? Something is overriding the window.ethereum injection.")
    }

    // Access the decentralizd web via metamask and ethers.js!
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();


    const loan_contract = new ethers.Contract(LOAN_ADDRESS, LOAN_ABI, provider);

    const loan_account = loan_contract.connect(signer);

    console.log(loan_account);

}