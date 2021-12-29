import { useEffect, useState } from 'react'

const PREFIX = 'ticket-guesser-'

export function deleteSessionStorage(){
    sessionStorage.clear()
}

export default function useSessionStorage( key, initialValue ) {
   const  prefixedKey = PREFIX + key

   const [value, setValue] = useState(() => {
       const jsonValue = sessionStorage.getItem(prefixedKey)

       if(jsonValue !== null) {
           return JSON.parse(jsonValue)
       }

       if(typeof initialValue === 'function'){
            return initialValue()
       } else {
           return initialValue
       }
   })

   useEffect(() => {
        sessionStorage.setItem(prefixedKey, JSON.stringify(value))
   },[prefixedKey, value])

   return [value, setValue]
}