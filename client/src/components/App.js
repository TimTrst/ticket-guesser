import React, { useState } from 'react'
import useLocalStorage from '../hooks/useLocalStorage'
import Login from './Login'
import Dashboard from './Dashboard'
//import Rooms from './Rooms'
import { SocketProvider } from '../contexts/SocketProvider'
import { TicketProvider } from '../contexts/TicketProvider'
import { UsersProvider } from '../contexts/UsersProvider'

function App() {

  const [id, setId] = useLocalStorage("id", "")
  const [room, setRoom] = useState("")

  const dashboard = (
    <SocketProvider id = {id} room={room}>
        <UsersProvider id ={id}>
          <TicketProvider id = {id}>
            <Dashboard id ={id} />
         </TicketProvider>
        </UsersProvider>
    </SocketProvider>
  )

  return (
      id ? dashboard : <Login onIdSubmit={ setId } setRoom={ setRoom }/>
  );
}

export default App;
