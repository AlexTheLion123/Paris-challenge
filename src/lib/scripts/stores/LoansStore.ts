import { writable } from 'svelte/store';

export let loansStore = writable([]);

function createLoansStore() {
    const { subscribe, set} = writable({});

    return {
        subscribe,
        set,
        reset: () => set({})
    }
}