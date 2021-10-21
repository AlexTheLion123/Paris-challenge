import { writable } from 'svelte/store';

export let loansStore = createLoansStore();

function createLoansStore() {
    const { subscribe, set} = writable({});

    return {
        subscribe,
        set,
        reset: () => set({})
    }
}