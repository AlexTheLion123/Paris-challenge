import { writable } from "svelte/store";

export const currentAccountStore = writable("")
export const isConnectedStore = writable(false)


// function createAccountStore() {
//     const {subscribe, set, update} = writable({isConnected: false, currentAccount: null})

//     return {
//         subscribe, 
//         set,
//         reset: () => set({})
//     }
// }