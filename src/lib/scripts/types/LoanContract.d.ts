/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import {
  ethers,
  EventFilter,
  Signer,
  BigNumber,
  BigNumberish,
  PopulatedTransaction,
  BaseContract,
  ContractTransaction,
  Overrides,
  PayableOverrides,
  CallOverrides,
} from "ethers";
import { BytesLike } from "@ethersproject/bytes";
import { Listener, Provider } from "@ethersproject/providers";
import { FunctionFragment, EventFragment, Result } from "@ethersproject/abi";
import type { TypedEventFilter, TypedEvent, TypedListener } from "./common";

interface LoanContractInterface extends ethers.utils.Interface {
  functions: {
    "acceptOrDeny(uint256,bool)": FunctionFragment;
    "clientToLoansIds(address,uint256)": FunctionFragment;
    "deposit()": FunctionFragment;
    "getBalance()": FunctionFragment;
    "getClientToLoansIds(address)": FunctionFragment;
    "getLoan(uint256)": FunctionFragment;
    "getRequestedLoans()": FunctionFragment;
    "id()": FunctionFragment;
    "idToLoan(uint256)": FunctionFragment;
    "paybackLoan(uint256)": FunctionFragment;
    "rate()": FunctionFragment;
    "requestIds(uint256)": FunctionFragment;
    "requestLoan(uint256)": FunctionFragment;
    "setLoanRate(uint256)": FunctionFragment;
    "withDraw()": FunctionFragment;
  };

  encodeFunctionData(
    functionFragment: "acceptOrDeny",
    values: [BigNumberish, boolean]
  ): string;
  encodeFunctionData(
    functionFragment: "clientToLoansIds",
    values: [string, BigNumberish]
  ): string;
  encodeFunctionData(functionFragment: "deposit", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "getBalance",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "getClientToLoansIds",
    values: [string]
  ): string;
  encodeFunctionData(
    functionFragment: "getLoan",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "getRequestedLoans",
    values?: undefined
  ): string;
  encodeFunctionData(functionFragment: "id", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "idToLoan",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "paybackLoan",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(functionFragment: "rate", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "requestIds",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "requestLoan",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "setLoanRate",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(functionFragment: "withDraw", values?: undefined): string;

  decodeFunctionResult(
    functionFragment: "acceptOrDeny",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "clientToLoansIds",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "deposit", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "getBalance", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "getClientToLoansIds",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "getLoan", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "getRequestedLoans",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "id", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "idToLoan", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "paybackLoan",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "rate", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "requestIds", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "requestLoan",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "setLoanRate",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "withDraw", data: BytesLike): Result;

  events: {};
}

export class LoanContract extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  listeners<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter?: TypedEventFilter<EventArgsArray, EventArgsObject>
  ): Array<TypedListener<EventArgsArray, EventArgsObject>>;
  off<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>,
    listener: TypedListener<EventArgsArray, EventArgsObject>
  ): this;
  on<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>,
    listener: TypedListener<EventArgsArray, EventArgsObject>
  ): this;
  once<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>,
    listener: TypedListener<EventArgsArray, EventArgsObject>
  ): this;
  removeListener<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>,
    listener: TypedListener<EventArgsArray, EventArgsObject>
  ): this;
  removeAllListeners<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>
  ): this;

  listeners(eventName?: string): Array<Listener>;
  off(eventName: string, listener: Listener): this;
  on(eventName: string, listener: Listener): this;
  once(eventName: string, listener: Listener): this;
  removeListener(eventName: string, listener: Listener): this;
  removeAllListeners(eventName?: string): this;

  queryFilter<EventArgsArray extends Array<any>, EventArgsObject>(
    event: TypedEventFilter<EventArgsArray, EventArgsObject>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TypedEvent<EventArgsArray & EventArgsObject>>>;

  interface: LoanContractInterface;

  functions: {
    acceptOrDeny(
      _loanID: BigNumberish,
      _decision: boolean,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    clientToLoansIds(
      arg0: string,
      arg1: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    deposit(
      overrides?: PayableOverrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    getBalance(
      overrides?: CallOverrides
    ): Promise<[BigNumber] & { _balance: BigNumber }>;

    getClientToLoansIds(
      _addr: string,
      overrides?: CallOverrides
    ): Promise<[BigNumber[]] & { _ids: BigNumber[] }>;

    getLoan(
      _id: BigNumberish,
      overrides?: CallOverrides
    ): Promise<
      [
        [BigNumber, string, BigNumber, BigNumber, BigNumber, number] & {
          id: BigNumber;
          borrowerAddress: string;
          amountBorrowed: BigNumber;
          amountOutstanding: BigNumber;
          rate: BigNumber;
          loanState: number;
        }
      ]
    >;

    getRequestedLoans(overrides?: CallOverrides): Promise<[BigNumber[]]>;

    id(overrides?: CallOverrides): Promise<[BigNumber]>;

    idToLoan(
      arg0: BigNumberish,
      overrides?: CallOverrides
    ): Promise<
      [BigNumber, string, BigNumber, BigNumber, BigNumber, number] & {
        id: BigNumber;
        borrowerAddress: string;
        amountBorrowed: BigNumber;
        amountOutstanding: BigNumber;
        rate: BigNumber;
        loanState: number;
      }
    >;

    paybackLoan(
      _loanID: BigNumberish,
      overrides?: PayableOverrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    rate(overrides?: CallOverrides): Promise<[BigNumber]>;

    requestIds(
      arg0: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    requestLoan(
      _amount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    setLoanRate(
      _rate: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    withDraw(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;
  };

  acceptOrDeny(
    _loanID: BigNumberish,
    _decision: boolean,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  clientToLoansIds(
    arg0: string,
    arg1: BigNumberish,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  deposit(
    overrides?: PayableOverrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  getBalance(overrides?: CallOverrides): Promise<BigNumber>;

  getClientToLoansIds(
    _addr: string,
    overrides?: CallOverrides
  ): Promise<BigNumber[]>;

  getLoan(
    _id: BigNumberish,
    overrides?: CallOverrides
  ): Promise<
    [BigNumber, string, BigNumber, BigNumber, BigNumber, number] & {
      id: BigNumber;
      borrowerAddress: string;
      amountBorrowed: BigNumber;
      amountOutstanding: BigNumber;
      rate: BigNumber;
      loanState: number;
    }
  >;

  getRequestedLoans(overrides?: CallOverrides): Promise<BigNumber[]>;

  id(overrides?: CallOverrides): Promise<BigNumber>;

  idToLoan(
    arg0: BigNumberish,
    overrides?: CallOverrides
  ): Promise<
    [BigNumber, string, BigNumber, BigNumber, BigNumber, number] & {
      id: BigNumber;
      borrowerAddress: string;
      amountBorrowed: BigNumber;
      amountOutstanding: BigNumber;
      rate: BigNumber;
      loanState: number;
    }
  >;

  paybackLoan(
    _loanID: BigNumberish,
    overrides?: PayableOverrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  rate(overrides?: CallOverrides): Promise<BigNumber>;

  requestIds(arg0: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;

  requestLoan(
    _amount: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  setLoanRate(
    _rate: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  withDraw(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  callStatic: {
    acceptOrDeny(
      _loanID: BigNumberish,
      _decision: boolean,
      overrides?: CallOverrides
    ): Promise<void>;

    clientToLoansIds(
      arg0: string,
      arg1: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    deposit(overrides?: CallOverrides): Promise<void>;

    getBalance(overrides?: CallOverrides): Promise<BigNumber>;

    getClientToLoansIds(
      _addr: string,
      overrides?: CallOverrides
    ): Promise<BigNumber[]>;

    getLoan(
      _id: BigNumberish,
      overrides?: CallOverrides
    ): Promise<
      [BigNumber, string, BigNumber, BigNumber, BigNumber, number] & {
        id: BigNumber;
        borrowerAddress: string;
        amountBorrowed: BigNumber;
        amountOutstanding: BigNumber;
        rate: BigNumber;
        loanState: number;
      }
    >;

    getRequestedLoans(overrides?: CallOverrides): Promise<BigNumber[]>;

    id(overrides?: CallOverrides): Promise<BigNumber>;

    idToLoan(
      arg0: BigNumberish,
      overrides?: CallOverrides
    ): Promise<
      [BigNumber, string, BigNumber, BigNumber, BigNumber, number] & {
        id: BigNumber;
        borrowerAddress: string;
        amountBorrowed: BigNumber;
        amountOutstanding: BigNumber;
        rate: BigNumber;
        loanState: number;
      }
    >;

    paybackLoan(
      _loanID: BigNumberish,
      overrides?: CallOverrides
    ): Promise<boolean>;

    rate(overrides?: CallOverrides): Promise<BigNumber>;

    requestIds(
      arg0: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    requestLoan(
      _amount: BigNumberish,
      overrides?: CallOverrides
    ): Promise<boolean>;

    setLoanRate(_rate: BigNumberish, overrides?: CallOverrides): Promise<void>;

    withDraw(overrides?: CallOverrides): Promise<boolean>;
  };

  filters: {};

  estimateGas: {
    acceptOrDeny(
      _loanID: BigNumberish,
      _decision: boolean,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    clientToLoansIds(
      arg0: string,
      arg1: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    deposit(
      overrides?: PayableOverrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    getBalance(overrides?: CallOverrides): Promise<BigNumber>;

    getClientToLoansIds(
      _addr: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getLoan(_id: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;

    getRequestedLoans(overrides?: CallOverrides): Promise<BigNumber>;

    id(overrides?: CallOverrides): Promise<BigNumber>;

    idToLoan(arg0: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;

    paybackLoan(
      _loanID: BigNumberish,
      overrides?: PayableOverrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    rate(overrides?: CallOverrides): Promise<BigNumber>;

    requestIds(
      arg0: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    requestLoan(
      _amount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    setLoanRate(
      _rate: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    withDraw(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    acceptOrDeny(
      _loanID: BigNumberish,
      _decision: boolean,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    clientToLoansIds(
      arg0: string,
      arg1: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    deposit(
      overrides?: PayableOverrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    getBalance(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    getClientToLoansIds(
      _addr: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getLoan(
      _id: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getRequestedLoans(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    id(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    idToLoan(
      arg0: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    paybackLoan(
      _loanID: BigNumberish,
      overrides?: PayableOverrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    rate(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    requestIds(
      arg0: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    requestLoan(
      _amount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    setLoanRate(
      _rate: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    withDraw(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;
  };
}
