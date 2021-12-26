import React, {useRef} from 'react'
import { Container, Form, Button, Row, ListGroup, Card} from 'react-bootstrap'
import "../css/Dashboard.css"

import { useSocket } from '../contexts/SocketProvider'
import { useTickets } from '../contexts/TicketProvider'
import Tickets from './Tickets/Tickets'
import Users from './Users'

export default function Dashboard({id}) {

    const { createTicket, tickets } = useTickets() 
    
    const socket = useSocket()
    const idRef = useRef()

    function handleSubmit(e){
        e.preventDefault()
        
        createTicket(idRef.current.value)
    }

    function handleResetLocalStorage(){
      localStorage.clear()
    }

    return (
      <div>
        <Container className="createTicketContainer">
          <Button className="resetLocalStorage mb-5" onClick={handleResetLocalStorage}>Reset LocalStorage</Button>

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
                    <Tickets ticket={ticket} id={id} index={index}/>
                  </ListGroup.Item>
              ))}
          </ListGroup>
        </Card>    
      </div>
    )

}
