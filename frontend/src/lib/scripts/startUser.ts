import { ethers } from 'ethers';
import LOAN_ABI from "$lib/abi/contracts/Loan.sol/LoanContract.json";
import type { LoanContract } from '$lib/types/index'
import { accountsObj } from './metamask_accounts';

declare let ethereum:any;
const LOAN_ADDRESS = '0x5FbDB2315678afecb367f032d93F642f64180aa3'

/**
 * 
 * @param _provider 
 * @returns promise for the signed loan contract  
 */
const user = function(_provider: ethers.providers.Web3Provider)  {    
    // Access the decentralizd web via metamask and ethers.js!
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const loan_contract = new ethers.Contract(LOAN_ADDRESS, LOAN_ABI, provider) as LoanContract; // Instantiate contract
    
    this.signer = provider.getSigner();
    this.signedLoanContract = loan_contract.connect(this.signer);// Sign contract with current address
}


user.prototype.getLoans = function() {
    return this.signedLoanContract.getClientToLoansIds(this.getSignerAddress);
}
// user.prototype.repayfunction() {

// }
user.prototype.requestLoan = function(): Promise<ethers.ContractTransaction> {
    return this.signedLoanContract.requestLoan(1000)
}
user.prototype.getSignerAddress = function() {
    return 
}
export default user;