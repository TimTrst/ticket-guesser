import React, { useEffect, useState, useCallback } from 'react'
import { Card } from 'react-bootstrap'

import { useSocket } from '../contexts/SocketProvider';
 
export default function Users({id}) {

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
        console.log("hi??")
       
        return () => socket.off('setNewUsers')
    }, [socket, setNewUsers])
    
    return (
        <Card>
            {users && users.map(function(user, i){
                    return (
                        <p key = {i}>{user}</p>
                    )
                })}
        </Card>
    )
}
