import React, { useEffect, useContext, useState } from 'react'
import io from 'socket.io-client'

const SocketContext = React.createContext()

export function useSocket(){
    return useContext(SocketContext)
}

export function SocketProvider( {id, room, children} ) {
    const [socket, setSocket] = useState()

    useEffect(() => {
        const newSocket = io('http://localhost:5000', { transports: ['websocket'],upgrade: false, query: { id, room } })
        setSocket(newSocket)
        return () => newSocket.close()
    }, [id])

    return (
        <SocketContext.Provider value={socket}>
            {children}
        </SocketContext.Provider>
    )
}
