<script>
    import {connect} from '$lib/accounts';
</script>

<div class="button connect-btn" on:click={connect}>Connect to metamask</div>

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

    }


</style>