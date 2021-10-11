import { Signer } from "@ethersproject/abstract-signer";
import { BigNumber } from "@ethersproject/bignumber";
import { ContractFactory } from "@ethersproject/contracts";
import { expect } from "chai";
import { ethers } from "hardhat";

import { LoanContract } from '../frontend/src/types/LoanContract';

describe("Loan contract", function () {
  let factory: ContractFactory, owner: Signer, addr1: Signer, addr2: Signer, addr3: Signer, loanContract: LoanContract;

  beforeEach(async () => {
    factory = await ethers.getContractFactory("LoanContract");
    [owner, addr1, addr2, addr3] = await ethers.getSigners();
    loanContract = await factory.deploy() as LoanContract;

  })

  describe("Deployment", () => {
    it("Should set rate to 5 upon deployment", async () => {
      const rate = await loanContract.rate();
      expect(rate).to.equal(5);
    });

    it("Should have empty requestIds upon deployment", async () => {
      const requestIds = await loanContract.getRequestedLoans();
      expect(requestIds).to.be.empty;
    })
  })

  describe("Loan txns", () => {
    it("Should set rate correctly", async () => {
      const rate = await loanContract.rate();
      await loanContract.setLoanRate(6);
      expect(await loanContract.rate()).to.equal(6);

    })

    it("Should not allow the owner to request a loan", async () => {
      await expect(
        loanContract.requestLoan(1000)
      ).to.be.revertedWith("Owner cannot request loans");
    })

    it("Should allow other user to request loan", async () => {
      // connect to other account
      await expect(loanContract.connect(addr1).requestLoan(1000)).to.not.be.reverted;
    })

    it("Should create Loan struct on successful loan request", async () => {
      await loanContract.connect(addr1).requestLoan(1000);

      const thisLoan = await loanContract.getLoan(1);
      
      interface LoanProps {
        id:BigNumber,
        amountBorrowed:BigNumber
        amountOutstanding:BigNumber
        rate:BigNumber
        loanState:number
      }
      
      const loanProps: LoanProps = thisLoan;
      const id = loanProps.id.toNumber();
      const amountBorrowed = loanProps.amountBorrowed.toNumber()
      const amountOutstanding = loanProps.amountOutstanding.toNumber()
      const rate = loanProps.rate.toNumber()

      expect(id).equal(1);
      expect(amountBorrowed).equal(1000);
      expect(amountOutstanding).equal(0); // since loan not granted yet
      expect(rate).equal(5);
    })

    it("Should set requestIds correctly", async () => {
      await loanContract.connect(addr1).requestLoan(1000);
      const requestIds = await loanContract.getRequestedLoans();
      expect(requestIds[0]).equal(1);
    })

    it("Should update clientToLoansIds correctly", async () => {
      await loanContract.connect(addr1).requestLoan(1000);
      await loanContract.connect(addr2).requestLoan(1000);
      await loanContract.connect(addr1).requestLoan(1000);
      await loanContract.connect(addr3).requestLoan(1000);
      await loanContract.connect(addr2).requestLoan(1000);

      const addr1Ids = await loanContract.getClientToLoansIds(await addr1.getAddress());
      const addr2Ids = await loanContract.getClientToLoansIds(await addr2.getAddress());
      const addr3Ids = await loanContract.getClientToLoansIds(await addr3.getAddress());

      lengthChecking:
      expect(addr1Ids.length).equal(2)
      expect(addr2Ids.length).equal(2)
      expect(addr3Ids.length).equal(1)

      expect(addr1Ids[0].toNumber()).equal(1);
      expect(addr1Ids[1].toNumber()).equal(3);
      expect(addr2Ids[0].toNumber()).equal(2);
      expect(addr2Ids[1].toNumber()).equal(5);
      expect(addr3Ids[0].toNumber()).equal(4);

    })
  })

  describe("Loan acceptance and denial", () => {
    it("Should change loan status correctly after denial", async () => {
      await loanContract.connect(addr1).requestLoan(1000);
      let requestIds = await loanContract.getRequestedLoans();

      // check that requests were made successfully
      expect(requestIds[0].toNumber()).equal(1);
      
      // check that requeset removed
      await loanContract.acceptOrDeny(1, false);

      const thisLoan = await loanContract.getLoan(1);

      expect(thisLoan.loanState).equal(2);
    })

    it("Should change loan status correctly after acceptance", async () => {
      await loanContract.connect(addr1).requestLoan(1000);
      let requestIds = await loanContract.getRequestedLoans();

      // check that requests were made successfully
      expect(requestIds[0].toNumber()).equal(1);
      
      // check that requeset removed
      await loanContract.acceptOrDeny(1, true);

      const thisLoan = await loanContract.getLoan(1);

      expect(thisLoan.loanState).equal(1);
    })

    // TODO - actually implement test
    it("Should adjust amount outstanding correctly after acceptance", async () => {
      await loanContract.connect(addr1).requestLoan(10000); // id = 1
      await loanContract.connect(addr2).requestLoan(2050); // id = 2
      await loanContract.connect(addr3).requestLoan(30210); // id = 3

      await loanContract.acceptOrDeny(1, true);
      await loanContract.acceptOrDeny(2, true);
      await loanContract.acceptOrDeny(3, true);
      const addr1Loan = await loanContract.getLoan(1);
      const addr2Loan = await loanContract.getLoan(2);
      const addr3Loan = await loanContract.getLoan(3);


      console.log(addr1Loan.amountOutstanding.toNumber());
      console.log(addr2Loan.amountOutstanding.toNumber());
      console.log(addr3Loan.amountOutstanding.toNumber());
      // expect(addr1Loan.amountOutstanding.toNumber()).equal(10500);
    })

    it("Should remove loan correctly after denial", async () => {
      await loanContract.connect(addr1).requestLoan(1000);
      await loanContract.connect(addr2).requestLoan(2000);
      await loanContract.connect(addr3).requestLoan(3000);
      let requestIds = await loanContract.getRequestedLoans();

      // check that requests were made successfully
      expect(requestIds[0].toNumber()).equal(1);
      expect(requestIds[1].toNumber()).equal(2);
      expect(requestIds[2].toNumber()).equal(3);
      
      // check that requeset removed
      await loanContract.acceptOrDeny(2, false);
      // updaate reqeustIds
      requestIds = await loanContract.getRequestedLoans();

      expect(requestIds[1].toNumber()).equal(0);
    })
  })

  // TODO - simulate a full workflow for multiple users with different paths
  // describe("Integration test", () => {
    
  // })

});
