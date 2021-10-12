// import { connectSignal } from '../metamask_accounts';
// import type { ethers } from 'ethers';
// import type { LoanContract } from '$lib/types/index';


// interface Data {
//     requestAmount: number,
//     refundAmount: number,
// }

// /**
//  * @dev handles the submit data from Request.svelte component
//  * @param signedContract loan contract that has been connected with signer 
//  */
// export default function handleSubmit(data:Data) {
//     const {requestAmount, refundAmount} = data
//     validateInput(requestAmount, refundAmount)
    

//     /// @dev is this really necessary? Contract will validate
//     function validateInput(requestAmount: number, refundAmount: number): Boolean {
//         if(requestAmount > 0) return true; // change to relevant value
//         return false;
//     }
// }