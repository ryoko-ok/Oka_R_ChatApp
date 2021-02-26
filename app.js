const express = require('express');
const http = require('http'); // add
const path = require('path');
const { isObject } = require('util');
const messenger = require('socket.io')();
const app = express();
const chatMessages = document.querySelector('.chatmessages');
const userList = document.getElementById('users');
const {
    userJoin,
    getCurrentUser,
    userLeave,
  } = require('./utils/users');

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
    console.log(`${user.username} connected: ${socket.id}`);

    socket.userJoin;

    // send the connected user their assigned ID
    socket.emit('connected', { sID: `${socket.id}`, message: 'new connection'});

    // socket.on('message', message => {
    //     outputMessage(message);
    // });

    // Broadcast when a user connects
    // socket.broadcast.emit('message', `${user.username} has joined the chat`);

    socket.on('chatmessage', msg => {
        const user = getCurrentUser(socket.id);

        io.emit('message', formatMessage(user.username, msg));
        console.log(msg);
        
        messenger.emit('message', { username:username, id: socket.id, message: msg });
        
        // show last message automatically
        chatMessages.scrollTop = chatMessages.scrollHeight;

    });
    

    // a user leave from chat room
    socket.on('disconnect', () => {
        // io.emit('message', 'A user has finished a break');
        messenger.emit('message', `${user.username} has finished a break`);

    });
});

// users = [];
// io.on('connection', function(socket) {
//    console.log('A user connected');
//    socket.on('setUsername', function(data) {
//       console.log(data);
//       if(users.indexOf(data) > -1) {
//          socket.emit('userExists', data + ' username is taken! Try some other username.');
//       } else {
//          users.push(data);
//          socket.emit('userSet', {username: data});
//       }
//    });
   
//    socket.on('msg', function(data) {
//       //Send message to everyone
//       io.sockets.emit('newmsg', data);
//    })
// });

// http.listen(3000, function() {
//    console.log('listening on localhost:3000');
// });
