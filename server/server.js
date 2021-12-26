const io = require('socket.io')(5000)

let connectedUsers = []

io.on('connection', socket => {
    var room = "ticketRoom"

    const id = socket.handshake.query.id

    if(!(connectedUsers.find((user) => id == user))){
        connectedUsers.push(id)
    }

    socket.join(id)
    socket.join(room)
    
    socket.on('returnUsers', () => {
        io.to(room).emit('setNewUsers', connectedUsers)
        console.log(connectedUsers)
    })
    


})
