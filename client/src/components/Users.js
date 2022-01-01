import React, { useEffect, useState, useCallback } from 'react'
import { ListGroup, Card, Row, Col } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUsers } from '@fortawesome/free-solid-svg-icons'
import "../css/Dashboard.css"

import { useUsers } from '../contexts/UsersProvider';
 
export default function Users({ id }) {

    const {users} = useUsers()

    return (
        <Card className="userCard">
            <Row>
                <Col className="col-md-1">
                    <FontAwesomeIcon className="userIcon" icon = {faUsers} size="lg"/>
                </Col>
                <Col>
                    <ListGroup horizontal>
                        {users && users.map(function(user, i){
                                return (
                                    <ListGroup.Item key = {i}>{user}</ListGroup.Item>
                                )
                            })}
                    </ListGroup>
                </Col>
            </Row>
        </Card>
    )
}
