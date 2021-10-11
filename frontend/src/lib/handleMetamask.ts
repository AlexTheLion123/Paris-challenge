import { ethers } from 'ethers';
import detectEthereumProvider from '@metamask/detect-provider';

export default async function handleMetaMask() {
    const prov = await detectEthereumProvider();

    if (window.ethereum) {
        const prov = new ethers.providers.Web3Provider(window.ethereum);
        const signer = prov.getSigner();
        
        const currentBlock = await prov.getBlockNumber();
        console.log('Current block is: ', currentBlock.toString());
    }
}