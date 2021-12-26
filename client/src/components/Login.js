import React, { useRef } from 'react'
import { Container, Form, Button} from 'react-bootstrap'
import { v4 as uuidV4 } from 'uuid'
import '../css/Login.css'

export default function Login( { onIdSubmit } ){
    const idRef = useRef()
    

    let warning = ""

    function handleSubmit(e){
        e.preventDefault()

        warning = ""
        
        onIdSubmit(idRef.current.value)
    }

    /*
    function createNewId(){
        onIdSubmit(uuidV4())
    }*/

    return (
        <Container className="loginContainer">
          {warning}
          <Form onSubmit={handleSubmit} className="w-100">
            <Form.Group>
              <Form.Label>Enter Your Id</Form.Label>
              <Form.Control className="inputId" type="text" ref={idRef} required />
            </Form.Group>   
            <Button type="submit" className="submitButton">Enter</Button>
            {/*<Button onClick={createNewId} variant="secondary">Create A New Id</Button>*/}
          </Form>
        </Container>
      )
}