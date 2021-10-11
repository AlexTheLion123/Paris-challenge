<script type="ts">
    import { ethers } from 'ethers';
    import detectEthereumProvider from '@metamask/detect-provider';
    import { onMount } from 'svelte';
    
    // declare let ethereum: any;
    onMount( async () => {
        const provider = await detectEthereumProvider();

        if (window.ethereum) {
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();

            const currentBlock = await provider.getBlockNumber();
            console.log("Current block is: ", currentBlock);
        }
    })

</script>


<nav>
    <h1>Alex Loan App</h1>
</nav>

<slot></slot>

<style>
    @import url('https://fonts.googleapis.com/css2?family=Nunito&display=swap');

    :global(*, *::before, *::after) {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }
    
    :global(html){
        font-family: 'Nunito', sans-serif;
        height: 100%;
        font-size: 16px;
    }

    nav {
        background: rgb(224, 224, 224);
        height: 100px;
        color: black;

        display: grid;
        place-items: center;
    }
</style>