const io = require('socket.io')(5000)

let connectedUsers = []
let counter = 0

io.on('connection', socket => {
    var room = "ticketRoom"

    let id = socket.handshake.query.id

    if((connectedUsers.find((user) => id == user))){
        id = id + " (" + counter + ")"
        counter++
    }
    connectedUsers.push(id)

    socket.join(id)
    socket.join(room)
    
    socket.on('returnUsers', () => {
        io.to(room).emit('setNewUsers', connectedUsers)
        console.log(connectedUsers)
    })
    
    socket.on('disconnect', function() {
        console.log("disconnect: ", socket.id);
        
        const index = connectedUsers.indexOf(id)
        if(index > -1){
            connectedUsers.splice(index, 1)
        }
        io.to(room).emit('setNewUsers', connectedUsers)
    });

    socket.on('createTicket', (ticketName) => {
        io.to(room).emit('createTicket', ticketName)
    })

    socket.on('addGuessToTicket', (guess) => {
        io.to(room).emit('addGuessToTicket', guess)
    })
})
