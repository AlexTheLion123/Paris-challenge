import { ethers } from 'ethers';
import LOAN_ABI from "./abi/contracts/Loan.sol/LoanContract.json";
import type { LoanContract } from './types';
import { Signer } from "@ethersproject/abstract-signer";


export default function startApp(_provider) {
    const LOAN_ADDRESS = '0x5FbDB2315678afecb367f032d93F642f64180aa3'
    
    // If the provider returned by detectEthereumProvider is not the same as window.ethereum. Something is overriding it, perhaps another wallet
    if (_provider !== window.ethereum) {
        alert("Do you multiple wallets installed?")
    }

    // Access the decentralizd web via metamask!
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();


    const loan_contract = new ethers.Contract(LOAN_ADDRESS, LOAN_ABI, provider);

    const loan_owner = loan_contract.connect(signer);

}