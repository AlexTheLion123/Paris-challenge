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

export interface userLoan {
    id:  number,
    borrowerAddress: string,
    amountBorrowed: number,
    amountOutstanding: number,
    rate: number,
    loanState: number,
    status?: 'requested' | 'granted' | 'denied' | 'paidBack'
}

interface TempLoan {
    id:  ethers.BigNumber,
    borrowerAddress: string,
    amountBorrowed: ethers.BigNumber,
    amountOutstanding: ethers.BigNumber,
    rate: ethers.BigNumber,
    loanState: number,
    status?: 'requested' | 'granted' | 'denied' | 'paidBack'
}

/// @dev utility function to ensure loan.id is a big number
function isBigNumberString(id: ethers.BigNumber | string): id is ethers.BigNumber {
    return (id as ethers.BigNumber) !== undefined
}
function isBigNumberNumber(id: ethers.BigNumber | number): id is ethers.BigNumber {
    return (id as ethers.BigNumber) !== undefined
}


export default class user implements User {
    #LOAN_ADDRESS = '0x5fbdb2315678afecb367f032d93f642f64180aa3'
    #provider = new ethers.providers.Web3Provider(window.ethereum);
    readonly loan_contract = new ethers.Contract(this.#LOAN_ADDRESS, LOAN_ABI, this.#provider) as LoanContract; // Instantiate contract
    #signer: Signer = this.#provider.getSigner();
    readonly signedLoanContract = this.loan_contract.connect(this.#signer);// Sign contract with current address

    async getLoanIds(): Promise<number[]> {
        const temp = await this.signedLoanContract.getClientToLoansIds(await this.getSignerAddress());
        console.log
        let loanIds: number[];
        //for (let i = 0; i < temp.length; i++) {
        //    loanIds.push(temp[i].toNumber());
        //}
        loanIds = temp.map(item => {
            return item.toNumber();
        })
        return loanIds;
    }
    async getLoansFromIds(ids: Array<number>): Promise<userLoan[]> {
        let userLoans: Array<userLoan> = [];
        for (let i = 0; i < ids.length; i++) {
            // change bignumbers to numbers
            const temp: TempLoan = await this.signedLoanContract.idToLoan(ids[i]); // have to assign to temporary since it returned object seems to be readonly
            const loan: any = { ...temp }

            if (isBigNumberNumber(loan.id)) loan.id = loan.id.toNumber();
            if (isBigNumberString(loan.amountBorrowed)) loan.amountBorrowed = parseInt(ethers.utils.formatEther(loan.amountBorrowed).toString());
            if (isBigNumberString(loan.amountOutstanding)) loan.amountOutstanding = parseInt(ethers.utils.formatEther(loan.amountOutstanding).toString());
            if (isBigNumberNumber(loan.rate)) loan.rate = loan.rate.toNumber();
            switch (loan.loanState) {
                case 0: loan.status = "requested"
                case 1: loan.status = "granted"
                case 2: loan.status = "denied"
                case 3: loan.status = "paidBack"
            }
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
        return "123"
    }
}
