import React, {useState,useEffect, useCallback, useContext } from 'react'
import useLocalStorage from '../hooks/useLocalStorage';

import { useSocket } from '../contexts/SocketProvider';

const UsersContext = React.createContext()

export function useUsers() {
  return useContext(UsersContext)
}

export function UsersProvider({ children }) {
  
    const [users, setUsers] = useState([])
    const socket = useSocket()

    useEffect(() => {
        if(socket == null) return

        console.log(socket)

        socket.emit('returnUsers')
        
    }, [socket])
    
    const setNewUsers = useCallback((connectedUsers) => {
        setUsers(connectedUsers)
        console.log(users)
    }, [setUsers])

    useEffect(() => {
        if(socket == null) return

        socket.on('setNewUsers', setNewUsers)
       
        return () => socket.off('setNewUsers')
    }, [socket, setNewUsers])

  return (
    <UsersContext.Provider value={{ users, setNewUsers }}>
      {children}
    </UsersContext.Provider>
  )
}