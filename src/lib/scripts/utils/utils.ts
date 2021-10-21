import type { ethers } from 'ethers';

/// @dev utility function to ensure loan.id is a big number
export function isBigNumberString(id: ethers.BigNumber | string): id is ethers.BigNumber {
    return (id as ethers.BigNumber) !== undefined
}
export function isBigNumberNumber(id: ethers.BigNumber | number): id is ethers.BigNumber {
    return (id as ethers.BigNumber) !== undefined
}

