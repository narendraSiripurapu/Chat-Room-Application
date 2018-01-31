var socket = io();

socket.on('connect',function(){
   console.log("connected to server");
  
});

socket.on('disconnect',function(){
    console.log('disconnected from server');
});

socket.on('newMessage',function(message){
   console.log('newMessage',message);
   var li=jQuery('<li></li>');
   li.text(`${message.from}: ${message.text}`);
   jQuery('#messages').append(li);
});

socket.emit('createMessage',{
    from:'naren',
    text:'hi'
},function(data){
    console.log('got it');
    console.log(data);
});

jQuery('#message-form').on('submit',function(e){
    e.preventDefault();
     console.log("in loop");
    socket.emit('createMessage',{
        from :'User',
        text: jQuery('[name=message]').val()
    },function(){

    });
});