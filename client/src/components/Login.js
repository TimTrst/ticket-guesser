import React, { useRef } from 'react'
import { Container, Form, Button} from 'react-bootstrap'
import '../css/Login.css'

export default function Login( { onIdSubmit, setRoom } ){
    const idRef = useRef()
    const roomRef = useRef()
    
    function handleSubmit(e){
        e.preventDefault()

        setRoom(roomRef.current.value)
        onIdSubmit(idRef.current.value)
    }

    return (
        <Container className="loginContainer">
          <Form onSubmit={ handleSubmit } className="w-100 loginForm">
            <Form.Group>
              <Form.Label>Your Id</Form.Label>
              <Form.Control className="inputId" type="text" ref={idRef} required />
              <Form.Label>Join/Create Room Name</Form.Label>
              <Form.Control className="inputId" type="text" ref={roomRef} required />
            </Form.Group>   
            <Button type="submit" className="submitButton">Enter</Button>
          </Form>
        </Container>
      )
}