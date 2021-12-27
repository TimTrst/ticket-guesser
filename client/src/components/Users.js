import React, { useEffect, useState, useCallback } from 'react'
import { ListGroup, Card } from 'react-bootstrap'

import { useSocket } from '../contexts/SocketProvider';
import { useUsers } from '../contexts/UsersProvider';
 
export default function Users({id}) {

    const {users} = useUsers()

    return (
        <Card>
            <Card.Title>Connected Users</Card.Title>
            <ListGroup horizontal>
                {users && users.map(function(user, i){
                        return (
                            <ListGroup.Item key = {i}>{user}</ListGroup.Item>
                        )
                    })}
            </ListGroup>
        </Card>
    )
}
