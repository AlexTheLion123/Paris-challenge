<script type="ts">
    import handleEthereum from '$lib/handleEth'
	import { onMount } from 'svelte';
	// import { LoanContract } from '../types/index';

	onMount(handleEthereum);
</script>

<nav>
	<h1>Alex Loan App</h1>
</nav>

<slot />

<style>
	@import url('https://fonts.googleapis.com/css2?family=Nunito&display=swap');

	:global(*, *::before, *::after) {
		margin: 0;
		padding: 0;
		box-sizing: border-box;
	}

	:global(html) {
		font-family: 'Nunito', sans-serif;
		height: 100%;
		font-size: 16px;
	}

	nav {
		background: rgb(224, 224, 224);
		height: 100px;
		color: black;

		display: grid;
		place-items: center;
	}
</style>
