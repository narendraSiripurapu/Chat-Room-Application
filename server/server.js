const path = require('path');
const express = require('express');
const socketIO = require('socket.io');
const http = require('http');

const {generateMessage,generateLocationMessage} = require('./utils/message');
const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));
//io.on listens to connection from client.
io.on('connection', (socket) => {
    console.log('new user connection');   
   
    socket.emit('newMessage',generateMessage('Admin','Welcome to the app'));
      
    socket.broadcast.emit('newMessage',generateMessage('Admin','new user joined the app'));
   
    socket.on('createMessage',(message,callback)=>{
        console.log('createMessage',message);
        io.emit('newMessage',generateMessage(message.from,message.text) );
        callback();
    });

    socket.on('createLocationMessage',(coords)=>{
    //io.emit('newMessage',generateMessage('Admin',`${coords.latitude}`));    
    io.emit('newLocationMessage',generateLocationMessage('Admin',coords.latitude,coords.longitude));

    });

    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
});


server.listen(port, () => {
    console.log(`server is up on port ${port}`);
});

