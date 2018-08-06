$(function () {
  var socket = io();

  $('#messages').append($('<li class="list-group-item list-group-item-dark">').text('Welcome!'));
  $('form').submit(function(){
    socket.emit('chat message', $('#m').val());
    $('#m').val('');
    return false;
  });
  socket.on('chat message', function(msg){
    $('#messages').append($('<li class="list-group-item">').text(msg));
  });
});
