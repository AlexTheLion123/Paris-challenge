import { ethers, providers, Signer } from 'ethers';
import LOAN_ABI from "$lib/abi/contracts/Loan.sol/LoanContract.json";
import type { LoanContract } from '$lib/types/index';

declare let ethereum:any;

export interface User {
    readonly loan_contract: LoanContract;
    readonly signedLoanContract: LoanContract;

    getLoans(): Promise<ethers.BigNumber[]>
    requestLoan(amount: number): Promise<ethers.ContractTransaction>
    getSignerAddress(): Promise<string>
}

export default class user {    
    #LOAN_ADDRESS = '0x5fbdb2315678afecb367f032d93f642f64180aa3'
    #provider = new ethers.providers.Web3Provider(window.ethereum);
    readonly loan_contract = new ethers.Contract(this.#LOAN_ADDRESS, LOAN_ABI, this.provider) as LoanContract; // Instantiate contract
    #signer: Signer = this.#provider.getSigner();
    readonly signedLoanContract = this.loan_contract.connect(this.#signer);// Sign contract with current address

    async getLoans() {
        return (await this.signedLoanContract.getClientToLoansIds(await this.getSignerAddress()));
    }
    // user.prototype.repayfunction() {
    
    // }
    /**
     * @param amount wei
     */
    requestLoan(amount: number) {
        const amount_wei = ethers.utils.parseEther(amount.toString())
        console.log(amount_wei.toString())
        return this.signedLoanContract.requestLoan(amount_wei)
    }
    getSignerAddress() {
        return this.#signer.getAddress()
    }
}
