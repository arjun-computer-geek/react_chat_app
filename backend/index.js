const express = require('express');
const http = require('http');
const cors = require('cors');
const socketIO = require('socket.io');

const PORT = process.env.PORT || 5000;
const app = express();
const server = http.createServer(app);
const io = socketIO(server);

const users = [{}];

app.use(cors());

app.get('/', (req, res) => {
    res.send("working");
})

io.on('connection', (socket) => {
    console.log('new connection');

    socket.on('joined', ({user}) =>{
        users[socket.id] = user;
        socket.broadcast.emit('userJoined', {user: 'Admin', message: `${users[socket.id]} has joined`});
        socket.emit('welcome', {user: 'Admin', message: `Welcome to the chat, ${users[socket.id]}`});
    })

    socket.on('message', ({message, id}) => {
        io.emit('sendMessage', {user : users[id], message, id})
    })

    socket.on('disconnect', () => {
        socket.broadcast.emit('leave', {user : 'Admin', message: `${users[socket.id]} Has left`})
        console.log('user left')
    })


})

server.listen(PORT, () => {
    console.log(`Server is running on port : ${PORT}`)
})