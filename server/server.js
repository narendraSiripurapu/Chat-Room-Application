const path = require('path');
const express = require('express');
const socketIO = require('socket.io');
const http = require('http');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));
//io.on listens to connection from client.
io.on('connection', (socket) => {
    console.log('new user connection');

    /* socket.emit('newEmail', {
        from: 'naren@gmail.com',
        text: 'hey wassup',
        createAt: 123
    }); */
    
   /*  socket.emit('newMessage',{
        from: 'john',
        text: 'see you then',
        createAt: 123123
    }); */

    socket.on('createMessage',(message)=>{

        console.log('createMessage',message);

        io.emit('newMessage',{
            from: message.from,
            text: message.text,
            createdAt: new Date().getTime()

        } );

    });

    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
});


server.listen(port, () => {
    console.log(`server is up on port ${port}`);
});

