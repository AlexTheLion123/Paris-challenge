import { ethers } from 'ethers';
import LOAN_ABI from "$lib/abi/contracts/Loan.sol/LoanContract.json";

import type { LoanContract } from '../types/index'
import type { IUserLoan } from '../types/local-types/interfaces';

import { loansStore } from '../stores/LoansStore'

declare let ethereum: any; // injected into the browser

// import { currentAccountStore, isConnectedStore } from '$lib/scripts/stores/accountStores'

export const LoanContractObj = {
    address: '0x5fbdb2315678afecb367f032d93f642f64180aa3',
    provider: undefined as ethers.providers.Web3Provider,
    signer: undefined as ethers.providers.JsonRpcSigner,
    signedContract: undefined as LoanContract,
    signerAddress: undefined as string,
    loans: undefined as IUserLoan[],

    async initialize() {
        const providerTemp = await new ethers.providers.Web3Provider(window.ethereum);
        const contractTemp = new ethers.Contract(LoanContractObj.address, LOAN_ABI, providerTemp) as LoanContract; // Instantiate contract
        const signerTemp = providerTemp.getSigner();
        const signerAddrTemp = await signerTemp.getAddress();

        LoanContractObj.provider = providerTemp;
        LoanContractObj.signer = signerTemp;
        LoanContractObj.signedContract = contractTemp.connect(signerTemp);
        LoanContractObj.signerAddress = signerAddrTemp
    },

    async updateLoans() {
        const ids = await LoanContractObj.getLoanIds();
        const loans = await LoanContractObj.getLoansFromIds(ids)
        loansStore.set(loans);
        LoanContractObj.loans = loans;
    },

    /// @param amount in wei
    async requestLoan(amount: number) {
        const amount_wei = ethers.utils.parseEther(amount.toString())
        console.log(amount_wei.toString())
        const requestResult = await LoanContractObj.signedContract.requestLoan(amount_wei);
        LoanContractObj.updateLoans();
        return requestResult;
    },

    getSignerAddress() {
        return LoanContractObj.signerAddress
    },

    // TODO utils not actually used directly, decorate?
    async getLoanIds(): Promise<number[]> {
        const temp = await LoanContractObj.signedContract.getClientToLoansIds(await LoanContractObj.getSignerAddress());
        const loanIds = temp.map(item => {
            return item.toNumber();
        })
        return loanIds;
    },

    async getLoansFromIds(ids: Array<number>): Promise<IUserLoan[]> {
        let userLoans: Array<IUserLoan> = [];
        for (let i = 0; i < ids.length; i++) {
            // change bignumbers to numbers
            const temp = await LoanContractObj.signedContract.idToLoan(ids[i]); // have to assign to temporary since it returned object seems to be readonly
            const loan: any = { ...temp }

            loan.id = temp.id.toNumber();
            loan.amountBorrowed = parseInt(ethers.utils.formatEther(temp.amountBorrowed).toString());
            loan.amountOutstanding = parseInt(ethers.utils.formatEther(temp.amountOutstanding).toString());
            loan.rate = temp.rate.toNumber();
            switch (loan.loanState) {
                case 0: loan.status = "requested"; break;
                case 1: loan.status = "granted"; break;
                case 2: loan.status = "denied"; break;
                case 3: loan.status = "paidBack"; break;
            }
            userLoans.push(loan)
        }

        return userLoans;
    }
}



