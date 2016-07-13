/*
 * Proximity Chat Module
 */
Prox.Chat = (function(P,undefined){

  var _apiUrl = "/message";

  var handleNewMessage = function() {
      console.log("handleNewMessage function");
      event.preventDefault();
      var newMessage = {author: $("#nick").val(), text: $("#myarea").val()};
      io.socket.post(_apiUrl, newMessage);
      return false;
  };

  var init = function(){
    io.socket.on('connect', function() {

      io.socket.get(_apiUrl, function(messages) {
        console.log({messages: messages});
      });

      io.socket.on('new message', function(newMessage) {
        console.log(newMessage);
      });

    });
  };

  return {
    init: init,
    handleNewMessage : handleNewMessage
  };

}) (Prox);
