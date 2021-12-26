import React, { useContext, useState, useEffect, useCallback } from 'react'
import useLocalStorage from '../hooks/useLocalStorage';

import { useSocket } from './SocketProvider';

const TicketContext = React.createContext()

export function useTickets() {
  return useContext(TicketContext)
}

export function TicketProvider({ id, children }) {
  const [tickets, setTickets] = useLocalStorage('tickets', [])

  //const socket = useSocket()

  function createTicket(ticketName) {
    console.log(ticketName)
    setTickets(prevTickets => {
      return [...prevTickets, { ticketName, employee: [] }]
    })
  }

  const addGuessToTicket = useCallback((guess) => {
    if(Object.keys(guess).length === 0) return console.log("fuck")

    let ticketsTemp = [...tickets]
    let ticketToChange = {...ticketsTemp[guess.ticketId]}

    let guessToAdd = {
        name: guess.employee,
        guess: guess.guess
    }

    if(ticketToChange.employee){
      if(ticketToChange.employee.find((employee => employee.name == guess.employee))){
        ticketToChange.employee.find(employee => employee.name == guess.employee).guess = guess.guess
        
        ticketsTemp[guess.ticketId] = ticketToChange
        console.log(ticketsTemp)
        return setTickets([...ticketsTemp])
      }
      
      ticketToChange.employee.push(guessToAdd)
      ticketsTemp[guess.ticketId] = ticketToChange

      console.log(ticketsTemp)
      
      return setTickets([...ticketsTemp])
    }

    return
  }, [tickets])

  const value = {
    tickets: tickets,
    createTicket,
    addGuessToTicket: addGuessToTicket,
   }
  
  return (
    <TicketContext.Provider value={value}>
      {children}
    </TicketContext.Provider>
  )
}


function arrayEquality(a, b) {
  if (a.length !== b.length) return false

  a.sort()
  b.sort()

  return a.every((element, index) => {
    return element === b[index]
  })
}