//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.9;

import "hardhat/console.sol";

contract LoanContract {
    address private owner;
    enum LoanState{requested, granted, denied, paidBack}
    mapping(address => uint[]) public clientToLoansIds;
    uint[] public requestIds; // stores the IDs of all loans that have the requested LoanState
    uint public rate = 5; // default rate of 5%
    uint public id = 0;

    struct Loan {
        uint id;
        address borrowerAddress;
        uint amountBorrowed;
        uint amountOutstanding;
        uint rate;
        LoanState loanState;
    }

    mapping(uint => Loan) public idToLoan;

    constructor() {
        owner = msg.sender;
    }

    function getLoan(uint _id) external view returns(Loan memory){
        return idToLoan[_id];
    }

    function getClientToLoansIds(address _addr) public view returns(uint[] memory _ids){
        return clientToLoansIds[_addr];
    }

    /// @dev used by owner to deposit
    function deposit() external payable onlyOwner {}

    /// @dev get balance of contract
    function getBalance() public view returns(uint _balance){
        return address(this).balance;
    }

    /// @dev allows owner to change the going rate for loans
    function setLoanRate(uint _rate) external onlyOwner {
        require(_rate>0, "rate needs to be positive");
        rate = _rate;
    }

    /// @dev allows owner to withdraw balance of contract
    function withDraw() external onlyOwner returns(bool _success) {
        require(address(this).balance > 1 ether); // at least 1 ether before funds can be withdrawn
        uint balance = address(this).balance;
        payable(address(this)).transfer(balance);

        return(true);
    }

    /**
     * @dev allows anyone (except the owner) to request a loan
     * @dev initial default for amountOutstanding is zero, since loan not granted yet 
     */ 
    function requestLoan(uint _amount) external returns(bool _success) {
        require(msg.sender != owner, "Owner cannot request loans");
        id++;
        idToLoan[id] = Loan(id, msg.sender, _amount, 0, rate, LoanState.requested);
        clientToLoansIds[msg.sender].push(id);
        requestIds.push(id);

        return(true);    
    }

    /// @dev returns the array of requested loans. Automatic solidity getter not sufficient
    function getRequestedLoans() external view onlyOwner returns(uint[] memory){
        return requestIds;
    }

    /**
     * @dev allows owner to accept or deny a specific loan   
     * @param _decision - true = accept / false = deny
     */ 
    function acceptOrDeny(uint _loanID, bool _decision) external onlyOwner {
        Loan storage thisLoan = idToLoan[_loanID];
        
        if(_decision == true) {
            thisLoan.loanState = LoanState.granted;
            console.log("Amount borrowed: ", thisLoan.amountBorrowed);
            thisLoan.amountOutstanding = calcOutstanding(thisLoan.amountBorrowed, rate); // change amount outstanding
            console.log("Amount outstanding: ", thisLoan.amountOutstanding);
        } else { // ie. loan denied
            thisLoan.loanState = LoanState.denied;
        }

        removeLoan(_loanID);
    }

    /// @dev removes loan from requestIds and removes delete gap
    function removeLoan(uint _loanId) private {
        for(uint i=0; i<requestIds.length; i++) {
            if(requestIds[i] == _loanId){
                delete requestIds[i];
            }
        }
    }

    /// @dev only returns an approximation
    function calcOutstanding(uint _amount, uint _rate) private pure returns(uint _outstanding){
        uint divisor = 100/_rate;
        uint interest = _amount / divisor;
        return (_amount + interest);
    }
    

    /// @dev allows the user to payback a loan
    function paybackLoan(uint _loanID) external payable returns(bool _success) {
        // check that the user is paying back the correct loan
        Loan storage thisLoan = idToLoan[_loanID];

        require(thisLoan.borrowerAddress == msg.sender, "Your address did not take out this loan");
        require(msg.value <= thisLoan.amountOutstanding, "You are trying to pay more than the outstanding amount");

        thisLoan.amountOutstanding = thisLoan.amountBorrowed - msg.value;

        // check if fully paid off
        if(thisLoan.amountOutstanding == 0){
            thisLoan.loanState = LoanState.paidBack;
        }

        return true;

    }

    modifier onlyOwner() {
        require(msg.sender == owner);
        _;
    }
}
