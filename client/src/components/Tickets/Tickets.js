import React, { useRef, useState } from 'react'
import { Row, Col, Form, Button, Toast } from 'react-bootstrap'
import { useTickets } from '../../contexts/TicketProvider'
import ResultTable from './ResultTable'
import { useSocket } from '../../contexts/SocketProvider'

export default function Tickets({ id, ticket, index }) {

    const socket = useSocket()
    const { addGuessToTicket } = useTickets()
    const [validated, setValidated] = useState(false)
    const [showAlert, setShowAlert] = useState(false)

    const toggleShowAlert = () => setShowAlert(!showAlert)

    const guessRef = useRef()

    function handleSubmit(e){
        e.preventDefault()

        const form = e.currentTarget

        if(form.checkValidity() === false){
            e.stopPropagation()
        }
        console.log(checkInput(guessRef.current.value))
        if(checkInput(guessRef.current.value)){
            setValidated(true)

            const guess = {
                ticketId: index,
                employee: id,
                guess: guessRef.current.value,
            }

            socket.emit('addGuessToTicket', guess)
        }else{
            setValidated(false)
            toggleShowAlert()
        }

    }

    function checkInput(input){
        const regex = /^\s*[+-]?(\d+|\.\d+|\d+\.\d+|\d+\.)(e[+-]?\d+)?\s*$/

        if(input.match(regex)){
            return true
        }else{
            return false
        }
    }

    return (
    <Row>
        <Col>
            {ticket.ticketName}     
            <Form noValidate validated={validated} onSubmit={handleSubmit} className="w-100">
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
        <Toast className="toastAlert" bg="warning" show={showAlert} onClick={toggleShowAlert}>
            <Toast.Body>Input must be a number!</Toast.Body>
        </Toast>
    </Row>    
    )
}
