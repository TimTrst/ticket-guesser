import React from 'react'
import useLocalStorage from '../hooks/useLocalStorage'
import Login from './Login'
import Dashboard from './Dashboard'
import { SocketProvider } from '../contexts/SocketProvider'
import { TicketProvider } from '../contexts/TicketProvider'

function App() {

  const [id, setId] = useLocalStorage('id')

  const dashboard = (
    <SocketProvider id = {id}>
      <TicketProvider id = {id}>
         <Dashboard id ={id} />
      </TicketProvider>
    </SocketProvider>
  )

  return (
      id ? dashboard : <Login onIdSubmit={ setId }/>
  );
}

export default App;
