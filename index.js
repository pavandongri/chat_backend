const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors')

const app = express();
app.use(cors())

const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: 'http://localhost:3000',
        methods: ['GET', 'POST'],
        allowedHeaders: ['Content-Type'],
        credentials: true,
    }
});

app.get('/', (req, res) => {
    res.send('Chat server running');
});

io.on('connection', (socket) => {
    console.log('a user connected: ' + socket.id);

    socket.on('chat message', (msg) => {
        console.log('message: ' + msg.text);
        io.emit('chat message', msg);
    });

    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
});

const port = 3005

server.listen(port, () => {
    console.log('Server is running on port : ' + port);
});