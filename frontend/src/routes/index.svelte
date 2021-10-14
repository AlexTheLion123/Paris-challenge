<script type="ts">
	import Loan from '../components/Loan.svelte';
	import Request from '../components/Request.svelte';
	import ConnectButton from '../components/ConnectButton.svelte';

	import handleMetamask from '$lib/scripts/metamask';
	import { onMount } from 'svelte';

	import { userStore } from '$lib/scripts/metamask_accounts';
	import type { User } from '$lib/scripts/user';
	import type { userLoan } from '$lib/scripts/user';
	import type { ethers } from 'ethers';

	/**
	 * @dev callback is executed every time the user changes
	 */
	let user: User;
	let loans: userLoan[];
	let loanIds: number[];
	let isUser = false;
	onMount(() => {
		const unsubscribe = userStore.subscribe(async (item) => {
			user = item as User;

			if (user.testing) {
				console.log(user)
				isUser = true;
				loanIds = await user.getLoanIds();

				//loans = await user.getLoansFromIds(loanIds);
				//console.log(loans);
			}
			// TODO get loans every time
		});
	});

	onMount(handleMetamask);
</script>

<div class="container">
	<ConnectButton />

	<section class="my-loans">
		<h2>My loans</h2>
		<hr />

		<div class="grid-wrapper">
			{#if isUser}
				<!--{#each loans as loan, index}
					<div class="loan">
						<Loan
							{index}
							status={loan.status}
							rate={loan.rate}
							amount={loan.amountBorrowed}
							outstanding={loan.amountOutstanding}
						/>
					</div>
				{/each}-->
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
