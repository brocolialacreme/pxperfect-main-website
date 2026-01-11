const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

app.use(express.static(__dirname));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/main.html');
});

io.on('connection', (socket) => {
    socket.on('join_room', (roomName) => {
        for (const room of socket.rooms) {
            if (room !== socket.id) {
                socket.leave(room);
            }
        }
        socket.join(roomName);
        socket.currentRoom = roomName;
        socket.emit('room_joined', roomName);
    });

    socket.on('chat message', (msg) => {
        if (socket.currentRoom) {
            io.to(socket.currentRoom).emit('chat message', socket.id + " : " + msg);
        } else {
            io.emit('chat message', "ANNONCE PUBLIQUE : " + msg);
        }
    });

    socket.on('send_to_all', (msg) => {
        io.emit('chat message admin', `(Annonce de ${socket.id}) : ${msg}`);
    });

    socket.on('chuchoter', (msg) => {
        io.to(msg.user).emit('chat message', `[${socket.id} vous chuchote] : ${msg.message}`);
    });
});

const PORT = 3000;
server.listen(PORT, '0.0.0.0', () => {
    console.log(`Serveur accessible sur le port ${PORT}`);
});