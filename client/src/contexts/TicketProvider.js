import React, { useContext, useState, useEffect, useCallback } from 'react'
import useLocalStorage from '../hooks/useLocalStorage';

import { useSocket } from './SocketProvider';

const TicketContext = React.createContext()

export function useTickets() {
  return useContext(TicketContext)
}

export function TicketProvider({ children }) {
  const [tickets, setTickets] = useLocalStorage('tickets', [])

  const socket = useSocket()

  const createTicket = useCallback((ticketName) => {
    setTickets(prevTickets => {
      return [...prevTickets, { ticketName, employee: [], outputReady:false }]
    })
  },[setTickets])

  useEffect(()=> {
    if(socket == null) return

    socket.on('createTicket', createTicket)

    return () => socket.off('createTicket')
  },[socket, createTicket])

  //------------------------------------------------------------------------------------------------------------------
  const addGuessToTicket = useCallback((guess) => {
    if(Object.keys(guess).length === 0) return

    let ticketsTemp = [...tickets]
    let ticketToChange = {...ticketsTemp[guess.ticketId]}

    let guessToAdd = {
        name: guess.employee,
        guess: guess.guess,
        ready:false
    }

    if(ticketToChange.employee){
      if(ticketToChange.employee.find((employee => employee.name == guess.employee))){
        ticketToChange.employee.find(employee => employee.name == guess.employee).guess = guess.guess
        
        ticketsTemp[guess.ticketId] = ticketToChange
        
        return setTickets([...ticketsTemp])
      }
      
      ticketToChange.employee.push(guessToAdd)
      ticketsTemp[guess.ticketId] = ticketToChange
      
      return setTickets([...ticketsTemp])
    }
    return
  }, [tickets])

  useEffect(() => {
    if(socket == null) return
    
    socket.on('addGuessToTicket', addGuessToTicket)

    return () => socket.off('addGuessToTicket')
  }, [socket, addGuessToTicket])

  //------------------------------------------------------------------------------------------------------------------------
  
  //SET TRUE FOR READY FOR SINGLE EMPLOYEE
  const addReadyToEmployee = useCallback((readyUp) =>{
    let ticketsTemp = [...tickets]
    let ticketToChange = {...ticketsTemp[readyUp.ticketId]}

    if(ticketToChange.employee){
      console.log(ticketToChange)

      ticketToChange.employee.find(employee => employee.name == readyUp.employee).ready = true
  
      let ready = true
      if(ticketToChange.employee.find((employee) => employee.ready == false)){
        ready = false
      }

      console.log(ready)
      if(ready){
        ticketToChange.outputReady = true
      }
      
      ticketsTemp[readyUp.ticketId] = ticketToChange
        
      return setTickets([...ticketsTemp])
    }
    console.log("test")
    return
  },[tickets])

  useEffect(() => {
    if(socket == null) return
    
    console.log("hello")
    socket.on('setUserReadyForTicket', addReadyToEmployee)

    return () => socket.off('setUserReadyForTicket')
  }, [socket, addReadyToEmployee])


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