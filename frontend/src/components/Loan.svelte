<script>
	export let index, status, rate, amount, outstanding;
</script>

<h2>Loan #{index+1}</h2>
<h3>Status: <span class="status">{status}</span></h3>
<ul>
	Information:
	<li>Loan rate: {rate}%</li>
	<li>Loan amount: {amount}</li>
	<li>Outstanding amount: {outstanding}</li>
</ul>
{#if status == 'Granted'}
	<label for="repay">Repay loan:</label>
	<div class="text-and-eth"
		<input type="text" id="repay" placeholder="Enter amount to repay" />
		<span class="eth">ETH</span>
	</div>
	<input type="submit" class="button submit-btn" value="Submit" />
{/if}

<style type="scss">
	:global(input) {
		font-family: Nunito;

		&:focus {
			background: rgb(230, 230, 230);
			border: 1px solid black;
			outline: none;
		}
	}

	h2 {
		padding: 10px 0;
	}

	h3 {
		span.status {
			background: rgb(216, 216, 216);
			border-radius: 10px;
			padding: 5px;
		}
	}

	li {
		margin-left: 30px;
	}

	.text-and-eth {
		display: flex;
		height: 40px;

		input#repay {
			width: 80%;
			display: block;
			padding: 0 10px;
		}

		span.eth {
			height: 100%;
			border: 1px solid black;
            border-left: none;

			display: grid;
			place-items: center;
			width: 50px;
		}
	}

	.button {
		margin: 15px 0 0 0;
	}
</style>