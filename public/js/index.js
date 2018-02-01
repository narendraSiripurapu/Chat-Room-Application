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

var locationButton = jQuery('#send-location');
locationButton.on('click',function(){
 if(!navigator.geolocation){

    return alert('geolocation not supported by the user');

   }
   navigator.geolocation.getCurrentPosition(function(position){
      
     socket.emit('createLocationMessage',{
         latitude: position.coords.latitude,
         longitude: position.coords.longitude
            });
     },function(){
     alert('unable to fetch location');
     },{timeout:10000});
});

socket.on('newLocationMessage',function(message){
    var li = jQuery('<li></li>');
    var a = jQuery('<a target="_blank">Mycurrent Location</a>');
    li.text(`${message.from}:`);
    a.attr('href',message.url);
    li.append(a);
    jQuery('#messages').append(li);
});











