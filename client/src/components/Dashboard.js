import React, {useRef, useEffect, useCallback} from 'react'
import { Container, Form, Button, Row, ListGroup, Card} from 'react-bootstrap'
import "../css/Dashboard.css"

import { useSocket } from '../contexts/SocketProvider'
import { useTickets } from '../contexts/TicketProvider'
import useLocalStorage, {deleteItem} from '../hooks/useLocalStorage'
import { deleteSessionStorage } from '../hooks/useSessionStorage'
import Tickets from './Tickets/Tickets'
import Users from './Users'
import { io } from 'socket.io-client'

export default function Dashboard({id}) {

    const { tickets, setTickets } = useTickets()
    
    const socket = useSocket()
    const idRef = useRef()

    function handleSubmit(e){
        e.preventDefault()
        
        if(socket != null){
          socket.emit('createTicket', idRef.current.value)
        }
    }

    function handleResetLocalStorage(){
        deleteItem("id")
        deleteSessionStorage()
        window.location.reload(true)
    }

    function handleResetTickets(){
      if(!tickets || socket == null) return

      socket.emit('resetTickets')
    }

    const resetTickets = useCallback(() => {
      setTickets(prevTickets => prevTickets = [])
    }, [setTickets])

    useEffect(() => {
      if(socket == null) return

      socket.on('resetTickets', resetTickets)
      
      return () => socket.off('resetTickets')
    }, [socket, resetTickets])

    return (
      <div>
        <Container className="createTicketContainer">
          <Button className="resetLocalStorage mb-5" onClick={handleResetLocalStorage}>Logout</Button>

          {id !== undefined && <Users id={id}/>}

          <Form onSubmit={ handleSubmit } className="w-100 mb-5">
            <Form.Group as={Row}>
              <Form.Label column>Enter a Ticket name</Form.Label>
              <Form.Control className="inputId" type="text" ref={idRef} required />
              <Button type="submit" className="submitButton">Create a new Ticket</Button>
            </Form.Group> 
          </Form>
        </Container>
        <Card className="ticketCard">
          <ListGroup variant="flush">
              {tickets.map((ticket, index) => (
                <ListGroup.Item key={index}>
                  <Tickets ticket={ ticket } id={ id } index={ index }/>
                </ListGroup.Item>
              ))}
          </ListGroup>
        </Card>
        <Button className="clearTicketsButton btn btn-warning" onClick={handleResetTickets}>Clear Tickets/Reset Index</Button>    
      </div>
    )

}
