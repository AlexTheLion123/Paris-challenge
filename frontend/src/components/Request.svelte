<script lang="ts">
	import startUser from '$lib/scripts/startUser';

    async function requestLoan(){
        const request = await startUser();
        
    }

</script>

<form action="">
	<label for="requestAmount">Requested Amount</label>
	<div class="input-and-eth">
		<input type="number" id="requestAmount" placeholder="Enter reqeusted amount" />
		<span class="eth-label">ETH</span>
	</div>

	<label for="refundAmount">Amount to refund if borrowed</label>
	<div class="input-and-eth">
		<input type="number" id="refundAmount" placeholder="Enter amount fo refund" />
		<span class="eth-label">ETH</span>
	</div>

	<input
		type="submit"
		value="Request new loan"
		class="button submit-btn"
		on:submit|preventDefault={requestLoan}
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
