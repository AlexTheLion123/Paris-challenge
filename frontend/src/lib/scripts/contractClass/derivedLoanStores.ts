import { userStore } from './createUserStore';
import { derived } from 'svelte/store'
import type { User } from './user'

export const loansDStore = derived(userStore, ($userStore: User, set) => {
    console.log("Inside derived, user is currently", $userStore)
    if($userStore.exists){
        new Promise((resolve, reject) => {
            console.log("Inside promise");
            resolve($userStore.getLoanIds())
        })
        .then(loanIds => {
            return Array.isArray(loanIds) && $userStore.getLoansFromIds(loanIds)
        })
        .then(res => {
            set(reduceProps(res))
        })
        .catch(err => {
            console.log(err);
        })
    }
}, [])

function reduceProps(array) {
   return array.map(item => { // removes unnecessary properties
        return { "id": item.id, "borrowerAddress": item.borrowerAddress, "amountBorrowed": item.amountBorrowed, "amountOutstanding": item.amountOutstanding, "rate": item.rate, "status": item.status, "loanState": item.loanState }
   })
}