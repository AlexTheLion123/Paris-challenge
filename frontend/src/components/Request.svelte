<script lang="ts">
	import { userStore } from '$lib/scripts/contractClass/createUserStore';
	import type { User } from '$lib/scripts/contractClass/user';
import { get } from 'svelte/store';

	let requestAmount = 2;
	let refundAmount = 0;
	let curRate = 10;
	$: repayAmount = requestAmount * (1+1/curRate); //TODO work it out the same way as in the contract

	// get user store
	let user: User;
	const unsubscribe = userStore.subscribe((item) => {
		user = item as User;
	});

	async function handleSubmit() {
		if (requestAmount < 0 || typeof requestAmount !== 'number') {
			return alert('Not a valid request amount');
		}
		if(!user.exists) throw ""
		const requesting = await user.requestLoan(requestAmount);
		console.log(requesting);
		// @ts-ignore
	}
</script>

<h2>Request new loan</h2>
<h3>Current rate: {curRate}%</h3>

<form action="">
	<label for="requestAmount">Requested Amount {requestAmount} &emsp Repay amount: {repayAmount}</label>
	<div class="input-and-eth">
		<input
			type="range"
			min="0"
			max="10"
			id="requestAmount"
			placeholder="Enter reqeusted amount"
			bind:value={requestAmount}
		/>
		<span class="eth-label">ETH</span>
	</div>

	<label for="refundAmount">Amount to refund if borrowed: {refundAmount}</label>
	<div class="input-and-eth">
		<input
			type="range"
			min="0"
			max="10"
			id="refundAmount"
			placeholder="Enter amount fo refund"
			bind:value={refundAmount}
		/>
		<span class="eth-label">ETH</span>
	</div>

	<input
		type="submit"
		value="Request new loan"
		class="button submit-btn"
		on:click|preventDefault={handleSubmit}
	/>
</form>

<style type="scss">
	:global(.button) {
		padding: 10px;
		width: 150px;
		background: rgb(198, 99, 255);
		border-radius: 2px;
		color: white;

		&:hover {
			background: darken(rgb(198, 99, 255), 10);
		}
	}

	h2 {
		margin: 20px 0 10px 0;
	}

	h3 {
		color: rgb(93, 93, 93);
	}
	form {
		margin: 20px 0;

		label {
			display: block;
			padding: 10px 0;
		}

		.input-and-eth {
			height: 50px;
			display: flex;

			input {
				width: 80%;
				border-radius: 1px;
				border: 1px solid rgba(0, 0, 0, 0.4);
				height: 100%;
				font-family: Nunito;
				padding: 0 10px;
			}

			span.eth-label {
				display: inline-block;
				height: 100%;
				border: 1px solid rgba(0, 0, 0, 0.4);
				border-radius: 1px;

				display: grid;
				place-items: center;
				padding: 0 10px;
				margin-left: 15px;
			}
		}

		.button {
			margin: 15px 0;
		}
	}
</style>
