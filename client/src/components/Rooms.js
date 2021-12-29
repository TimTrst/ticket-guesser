import React, { useRef, useState} from 'react'
import { Container, Form, Button} from 'react-bootstrap'
import '../css/Login.css'

import Dashboard from './Dashboard'
import { useSocket } from '../contexts/SocketProvider'

export default function Rooms() {

  const {socket} = useSocket
  const [room, setRoom] = useState("")

  const idRef = useRef()

  function handleSubmit(e){
    e.preventDefault()
    
    setRoom(idRef.current.value)

    if(socket != null){
      socket.emit('createTicket', room)
    }
}

const RoomContainer = 
  ( 
    <Container className="loginContainer">
        <Form onSubmit={ handleSubmit } className="w-100">
          <Form.Group>
            <Form.Label>Enter Room Name</Form.Label>
            <Form.Control className="inputId" type="text" ref={idRef} required />
          </Form.Group>   
          <Button type="submit" className="submitButton">Enter</Button>
        </Form>
    </Container>
  )
    return (
      room != "" ? <Dashboard /> :  RoomContainer
    )
}
