<script lang="ts">
    import {accountsObj} from '$lib/scripts/ethers/metamask_accounts';
    import {connectSignal} from '$lib/scripts/ethers/metamask_accounts';

    let btn_text = "Connect to metamask"
    $: isConnected = $connectSignal.isConnected

    $: if(isConnected === true) {
        btn_text = $connectSignal.account
    } else {
        btn_text = "Connect to metamask";
    }
</script>

<div class="button connect-btn" on:click={accountsObj.connect}>{btn_text}</div>

<style lang="scss">
    $button-color: rgb(198, 99, 255);

    .button {
        background: $button-color;
        margin: auto;
        position: relative;
        top: 20px;
        width: 200px;
        cursor: pointer;
        text-align: center;
        &:hover {
            background: darken($button-color, 10%);

        }
        overflow: hidden;
    }


</style>