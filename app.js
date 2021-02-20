const express = require('express');
const http = require('http'); // add
const path = require('path');
const messenger = require('socket.io')();
const app = express();
const chatMessages = document.querySelector('.chatmessages')

app.use(express.static("public"));

const port = process.env.PORT || 5050;

app.get("/index", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
});

app.get("/chat", (req, res) => {
    res.sendFile(path.join(__dirname, "chat.html"));
});

const server = app.listen(port, () => {
    console.log(`app is running on ${port}`);
});

// messenger is the connection manager - like a switchbord operator
messenger.attach(server);

// socket is the individual connection - the caller
messenger.on('connection', (socket) => {
    console.log(`a user connected: ${socket.id}`);

    // send the connected user their assigned ID
    socket.emit('connected', { sID: `${socket.id}`, message: 'new connection'});

    // socket.on('message', message => {
    //     outputMessage(message);
    // });

    // show last message automatically
    chatMessages.scrollTop = chatMessages.scrollHeight;

    // Broadcast when a user connects
    socket.broadcast.emit('message', 'a user has joined the chat');

    socket.on('chatmessage', function(msg) {
        console.log(msg);
        
        messenger.emit('message', { id: socket.id, message: msg });
    });
    

    // a user leave from chat room
    socket.on('disconnect', () => {
        // io.emit('message', 'A user has finished a break');
        // messenger.emit('message', 'a user has finishd a break');

    });
});
