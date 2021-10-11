<script>
	import Loan from '../components/Loan.svelte';
	import Request from '../components/Request.svelte';

	const loans = [
		{ status: 'Requested', rate: 10, amount: 10, outstanding: 11 },
		{ status: 'Requested', rate: 10, amount: 10, outstanding: 11 },
		{ status: 'Denied', rate: 10, amount: 10, outstanding: 11 },
		{ status: 'Paid back', rate: 10, amount: 10, outstanding: 11 },
		{ status: 'Granted', rate: 10, amount: 10, outstanding: 11 }
	]; // fake

	let curRate = 10;
</script>

<div class="container">
	<section class="my-loans">
		<h2>My loans</h2>
		<hr />

		<div class="grid-wrapper">
			{#each loans as loan, index}
				<div class="loan">
					<Loan
                        {index}
						status={loan.status}
						rate={loan.rate}
						amount={loan.amount}
						outstanding={loan.outstanding}
					/>
				</div>
			{/each}
		</div>
		<hr />
	</section>

	<section class="request">
		<h2>Request new loan</h2>
		<h3>Current rate: {curRate}%</h3>

		<Request />
	</section>
</div>

<footer>

</footer>

<style type="scss">
	.container {
		max-width: 1600px;
		margin: auto;
		padding: 0 50px;
		width: 100%;

		section {
			h3 {
				color: rgb(93, 93, 93);
			}
		}
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

	.request {
		h2 {
			margin: 20px 0 10px 0;
		}
        hr {

        }
	}

    footer {
        width: 100%;
        height: 100px;
        background: rgb(231, 231, 231);

    }
</style>