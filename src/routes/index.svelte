<script type="ts">
	import { onMount } from 'svelte';

	import Loan from '../components/Loan.svelte';
	import Request from '../components/Request.svelte';
	import ConnectButton from '../components/ConnectButton.svelte';

	import handleMetamask from '$lib/scripts/metamask/metamask';
	import { AccountManager } from '$lib/scripts/Classes/AccountManager';

	import { currentAccountStore, isConnectedStore } from '$lib/scripts/stores/accountStores';
	import { loansStore } from '$lib/scripts/stores/LoansStore'

	import type { IAccountManager } from '$lib/scripts/types/local-types/interfaces';
	import type { IUserLoan } from '$lib/scripts/types/local-types/interfaces';

	/**
	 * @dev callback is executed every time the user changes
	 */
	let user: IAccountManager;
	let isUser = false;
	let loans: IUserLoan[];

	$: console.log($loansStore)

	onMount(async () => {
		await handleMetamask()
		isUser = true;

		// const unsubscribeLoans = loansStore.subscribe((store: IUserLoan[]) => {
		// 	loans = store;
		// });
	});
</script>

<div class="container">
	<ConnectButton />

	<section class="my-loans">
		<h2>My loans</h2>
		<hr />

		<div class="grid-wrapper">
			{#if isUser}
				{#each $loansStore as loan}
					<div class="loan">
						{loan.status}
						<Loan
							index={loan.id}
							status={loan.status}
							rate={loan.rate}
							amount={loan.amountBorrowed}
							outstanding={loan.amountOutstanding}
						/>
					</div>
				{/each}
			{/if}
		</div>
		<hr />
	</section>

	<section class="request">
		<Request />
	</section>
</div>

<footer />

<style type="scss">
	.container {
		max-width: 1600px;
		margin: auto;
		padding: 0 50px;
		width: 100%;
	}
	.my-loans {
		h2 {
			margin: 20px 0;
		}

		hr {
			margin: 30px 0;
		}
		.grid-wrapper {
			width: 100%;
			display: grid;
			place-items: center;
			grid-template-columns: repeat(auto-fill, 500px);
			grid-row-gap: 50px;
			.loan {
				background: rgb(245, 245, 245);
				border-radius: 5px;
				padding: 30px;
				width: 400px;
				box-shadow: 0 0 3px black;
				line-height: 30px;
			}
		}
	}

	footer {
		width: 100%;
		height: 100px;
		background: rgb(231, 231, 231);
	}
</style>
