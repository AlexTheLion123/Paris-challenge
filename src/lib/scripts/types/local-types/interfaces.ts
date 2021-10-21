import type { LoanContract } from '../index';
import type { ethers } from 'ethers';
import type AccountManager from '../../Classes/AccountManager';
import type LoanContractC from '../../Classes/LoanContractObjbj';

export interface ILoanContractC {
    readonly address: string;
    readonly provider: ethers.providers.Web3Provider;
    readonly signer: ethers.Signer;
    readonly signedContract: LoanContract;
    loans: IUserLoan[];

    setLoans(): Promise<void>
    getAllLoans(): Promise<IUserLoan[]>;
    requestLoan(amount: number): Promise<ethers.ContractTransaction>
    getSignerAddress(): Promise<string>
    exists(): boolean
}

export interface IUserLoan {
    id:  number,
    borrowerAddress: string,
    amountBorrowed: number,
    amountOutstanding: number,
    rate: number,
    loanState?: number,
    status?: 'requested' | 'granted' | 'denied' | 'paidBack'
}

export interface IAccountManager {
    currentAccount: string,
    loanContractC: LoanContractC,
    setCurrentAccount(_account: string): void,
    handleAccountsChanged(accounts: string[]): void ,
    connect(): void,
    exists(): boolean
    loadLoanContract(): void;
}