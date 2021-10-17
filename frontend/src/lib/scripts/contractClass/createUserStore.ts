import { writable } from 'svelte/store'

export let userStore = createUserStore();

function createUserStore() {
    const { subscribe, set} = writable({});

    return {
        subscribe,
        set,
        reset: () => set({})
    }
}

