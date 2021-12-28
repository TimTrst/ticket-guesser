import React, { useRef } from 'react'
import { Container, Form, Button} from 'react-bootstrap'
import '../css/Login.css'

export default function Login( { onIdSubmit } ){
    const idRef = useRef()
    
    function handleSubmit(e){
        e.preventDefault()

        onIdSubmit(idRef.current.value)
    }

    return (
        <Container className="loginContainer">
          <Form onSubmit={ handleSubmit } className="w-100">
            <Form.Group>
              <Form.Label>Enter Your Id</Form.Label>
              <Form.Control className="inputId" type="text" ref={idRef} required />
            </Form.Group>   
            <Button type="submit" className="submitButton">Enter</Button>
          </Form>
        </Container>
      )
}