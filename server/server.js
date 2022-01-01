const io = require('socket.io')(5000)

let rooms = []
let counter = 1

io.on('connection', socket => {
    
    let id = socket.handshake.query.id
    let room = socket.handshake.query.room

    if(room !== -1 || room !== ""){
        
        setUserInRoom(room, id)
    
        socket.join(id)
        socket.join(room)        
    }
    
    socket.on('returnUsers', () => {
        io.to(room).emit('setNewUsers', returnAllUsersInRoom(room))
    })
    
    //USER DISCONNECT
    socket.on('disconnect', function() {
        console.log("disconnect: ", socket.id);
        
        let userIndex = -1
        let usersInRoom = returnAllUsersInRoom(room)

        let roomIndex = 0
        let indexTemp = 0

        rooms.forEach(element => {
            if(element.roomName === room){
                roomIndex = indexTemp
            }
            indexTemp++
        })

        //Nutzer aus Raum entfernen
        userIndex = usersInRoom.indexOf(id)

        if(userIndex > -1){
            if(rooms.length > 0){
                if(room){
                    rooms[roomIndex].connectedUsers.splice(userIndex,1)
                }
            }
        }

        //Raum entfernen, wenn leer
        if(returnAllUsersInRoom(room).length == 0){
            rooms.splice(roomIndex, 1)
        }
        
        io.to(room).emit('setNewUsers', returnAllUsersInRoom(room))
    });

    socket.on('createTicket', (ticketName) => {
        let roomTemp = rooms.find((r) => r.roomName === room)
        roomTemp.tickets.push(ticketName)

        let ticketIndex = roomTemp.tickets.length
        ticketIndex = ticketIndex - 1
        console.log(ticketIndex)

        const ticketInfo = {
            ticketName: ticketName,
            ticketIndex: ticketIndex
        }

        io.to(room).emit('createTicket', {ticketInfo})
    })

    socket.on('addGuessToTicket', (guess) => {
        io.to(room).emit('addGuessToTicket', guess)
    })

    socket.on('setUserReadyForTicket', (readyUp) => {
        io.to(room).emit('setUserReadyForTicket', readyUp)
    })

    socket.on('resetTickets', () => {
        io.to(room).emit('resetTickets')
    })
})

function returnAllUsersInRoom(room){
    if(Object.keys(room).length !== 0){
        let r = rooms.find((r) => r.roomName == room)
        if(r){
            return r.connectedUsers
        }else{
            return []
        }
    }else{
        return []
    }
}

function setUserInRoom(room, id){
    const newRoom = {
        roomName: room,
        connectedUsers: [id],
        tickets: []
    }

    let roomsCopy = rooms
    if(rooms.length != 0 ){

        let roomTemp = roomsCopy.find((r) => r.roomName == room)

        if(roomTemp)
        {
            if(roomTemp.connectedUsers.find((user) => id == user))
            {
                id = id + " (" + counter + ")"
                counter++
            }
            
            roomsCopy.map((r) => {
                r.roomName == roomTemp.roomName && r.connectedUsers.push(id)
            })
        }
        else {roomsCopy.push(newRoom)}
    }
    else {
        roomsCopy.push(newRoom)
    }
    rooms = roomsCopy
}