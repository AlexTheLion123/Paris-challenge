<script lang="ts">
	import { currentAccountStore, isConnectedStore } from '$lib/scripts/stores/accountStores';
    import { AccountManager } from '$lib/scripts/Classes/AccountManager'

	$currentAccountStore = AccountManager.currentAccount;

	let btn_text = 'Connect to metamask';

	$: if ($isConnectedStore) {
		btn_text = $currentAccountStore;
	} else {
		btn_text = 'Connect to metamask';
	}
</script>

<div class="button connect-btn" on:click={() => AccountManager.connect()}>{btn_text}</div>

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
