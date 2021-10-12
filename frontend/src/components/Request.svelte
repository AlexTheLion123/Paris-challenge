<script lang="ts">
    import { userStore } from '$lib/scripts/metamask_accounts';
    import { get } from 'svelte/store';
    import type { User } from '$lib/scripts/user';

    let requestAmount: number;

    let user: User;

    const unsubscribe = userStore.subscribe(item => {
        user = item as User;
    })
    $: console.log("user changed", user)
    
    async function handleSubmit() {
        const hello = await user.requestLoan(1000);
        console.log(hello)
        // console.log(await user.getLoans())
    }
    
</script>

<form action="">
	<label for="requestAmount">Requested Amount</label>
	<div class="input-and-eth">
		<input type="number" id="requestAmount" placeholder="Enter reqeusted amount" bind:value={requestAmount}/>
		<span class="eth-label">ETH</span>
	</div>

	<label for="refundAmount">Amount to refund if borrowed</label>
	<div class="input-and-eth">
		<input type="number" id="refundAmount" placeholder="Enter amount fo refund"/>
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
				border-left: none;

				display: grid;
				place-items: center;
				padding: 0 10px;
			}
		}

		.button {
			margin: 15px 0;
		}
	}
</style>
