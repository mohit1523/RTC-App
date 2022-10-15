const io = require('socket.io')(3000 , {
    cors:{
        origin: "*"
    }
});

let users = {};

io.on('connection' , (socket) => {

    socket.on('user-connected' , (uName) => {
        users[socket.id] = uName;
        socket.broadcast.emit('new-user' , uName);
    })

    socket.on('new-message' , (obj) => {
        socket.broadcast.emit('new-msg' , obj);
    })

    socket.on('disconnect' , () => {
        socket.broadcast.emit('user-disconnected' , users[socket.id]);
        delete users[socket.id];
    })
});
