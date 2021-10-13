import { ethers, providers, Signer } from 'ethers';
import LOAN_ABI from "$lib/abi/contracts/Loan.sol/LoanContract.json";
import type { LoanContract } from '$lib/types/index';

declare let ethereum: any;

export interface User {
    readonly loan_contract: LoanContract;
    readonly signedLoanContract: LoanContract;

    getLoanIds(): Promise<number[]>
    getLoansFromIds(ids: Array<number>): Promise<userLoan[]>
    requestLoan(amount: number): Promise<ethers.ContractTransaction>
    getSignerAddress(): Promise<string>
    testing(): string
}

interface userLoan {
    id: ethers.BigNumber | number,
    borrowerAddress: string,
    amountBorrowed: ethers.BigNumber | string,
    amountOutstanding: ethers.BigNumber | string,
    rate: ethers.BigNumber | number,
    loanState: number
}

/// @dev utility function to ensure loan.id is a big number
function isBigNumberString(id: ethers.BigNumber | string): id is ethers.BigNumber {
    return (id as ethers.BigNumber) !== undefined
}
function isBigNumberNumber(id: ethers.BigNumber | number): id is ethers.BigNumber {
    return (id as ethers.BigNumber) !== undefined
}


export default class user {
    #LOAN_ADDRESS = '0x5fbdb2315678afecb367f032d93f642f64180aa3'
    #provider = new ethers.providers.Web3Provider(window.ethereum);
    readonly loan_contract = new ethers.Contract(this.#LOAN_ADDRESS, LOAN_ABI, this.#provider) as LoanContract; // Instantiate contract
    #signer: Signer = this.#provider.getSigner();
    readonly signedLoanContract = this.loan_contract.connect(this.#signer);// Sign contract with current address

    async getLoanIds(): Promise<number[]> {
        const temp = await this.signedLoanContract.getClientToLoansIds(await this.getSignerAddress());
        let loanIds: number[];
        for(let i=0; i<temp.length; i++){
            loanIds.push(temp[i].toNumber());
        }
        return loanIds;
    }
    async getLoansFromIds(ids: Array<number>): Promise<userLoan[]> {
        let userLoans: Array<userLoan> = [];
        for (let i = 0; i < ids.length; i++) {
            // change bignumbers to numbers
            const temp: userLoan = await this.signedLoanContract.idToLoan(ids[i]); // have to assign to temporary since it returned object seems to be readonly
            const loan: userLoan = {...temp}

            if(isBigNumberNumber(loan.id)) loan.id = loan.id.toNumber();
            if(isBigNumberString(loan.amountBorrowed)) loan.amountBorrowed = ethers.utils.formatEther(loan.amountBorrowed).toString();
            if(isBigNumberString(loan.amountOutstanding)) loan.amountOutstanding = ethers.utils.formatEther(loan.amountOutstanding);
            if(isBigNumberNumber(loan.rate)) loan.rate = loan.rate.toNumber();
            userLoans.push(loan)
        }
        return userLoans;
    }
    /// @param amount wei
    requestLoan(amount: number) {
        const amount_wei = ethers.utils.parseEther(amount.toString())
        console.log(amount_wei.toString())
        return this.signedLoanContract.requestLoan(amount_wei)
    }
    getSignerAddress() {
        return this.#signer.getAddress()
    }
    testing() {
        return "testing testing 123"
    }
}
