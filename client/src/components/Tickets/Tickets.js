import React, { useRef } from 'react'
import { Row, Col, Form, Button, Table } from 'react-bootstrap'
import { useTickets } from '../../contexts/TicketProvider'
import ResultTable from './ResultTable'

export default function Tickets({ id, ticket, index }) {

    const { addGuessToTicket } = useTickets()
    const guessRef = useRef()

    function handleSubmit(e){
        e.preventDefault()

        const guess = {
            ticketId: index,
            employee: id,
            guess: guessRef.current.value,
        }

        addGuessToTicket(guess)
    }

    return (
    <Row>
        <Col>
            {ticket.ticketName}     
            <Form onSubmit={handleSubmit} className="w-100">
                <Form.Group>
                    <Form.Label>Enter a guess</Form.Label>
                    <Form.Control className="inputId" type="text" ref={guessRef} required />
                </Form.Group>   
                <Button type="submit" className="submitButton">Submit guess</Button>
                <Form.Check 
                    inline
                    type="checkbox"
                    id="checkboxReady"
                    label="ready up"
                />
            </Form>
        </Col>
        <Col>
            <ResultTable index={index}/>
        </Col>
    </Row>    
    )
}
