/*
 * Proximity Chat Module
 */

Prox.Chat = (function(P,undefined){

  var _apiUrl = "/message";
  var initial_nick = "";
  var first_connection = true;

  var handleNewMessage = function() {
      console.log("handleNewMessage function");
      event.preventDefault();
      var newMessage = {author: $("#nick").val(), text: $("#myarea").val()};
      io.socket.post(_apiUrl, newMessage, function (resData, jwres){
        console.log("created")
        var templ = JST["assets/templates/chat_elem.html"];
        $("#chat_wrap").prepend(templ(resData));
      });
      return false;
  };

  var init = function(nick){
    initial_nick = nick;

    var socket = io.connect();

    io.socket.on('connect', function() {
      if(first_connection){
        console.log("PRIMERA CONEXION, vamos a pedir los mensajes");
        first_connection = false;
        io.socket.get(_apiUrl + "?sort=createdAt%20DESC", function(messages) {
          console.log({messages: messages});
          var arrayLength = messages.length;
          var templ = JST["assets/templates/chat_elem.html"];
          for (var i = 0; i < arrayLength; i++) {
              //he creado una función timeSince y accedo a ella desde la vista
              //otras alternativas serían extender el objeto que se le pasa, o con los datos o con un helper
              //https://lostechies.com/derickbailey/2012/04/26/view-helpers-for-underscore-templates/
              $("#chat_wrap").append(templ(messages[i]));
          }
        });
        io.socket.get(_apiUrl + "?sort=createdAt%20DESC", function(messages) {
          console.log({messages: messages});
          var arrayLength = messages.length;
          var templ = JST["assets/templates/chat_elem.html"];
          for (var i = 0; i < arrayLength; i++) {
              //he creado una función timeSince y accedo a ella desde la vista
              //otras alternativas serían extender el objeto que se le pasa, o con los datos o con un helper
              //https://lostechies.com/derickbailey/2012/04/26/view-helpers-for-underscore-templates/
              $("#chat_wrap").append(templ(messages[i]));
          }
        });
      }
    });

    io.socket.on('message', function notificationReceivedFromServer ( message ) {
      console.log("created")
      var templ = JST["assets/templates/chat_elem.html"];
      $("#chat_wrap").prepend(templ(message.data));

    });
  };

  /*obtenida de
  * http://stackoverflow.com/questions/3177836/how-to-format-time-since-xxx-e-g-4-minutes-ago-similar-to-stack-exchange-site
  */
  var timeSince = function (date) {

      var seconds = Math.floor((new Date() - date) / 1000);

      var interval = Math.floor(seconds / 31536000);

      if (interval > 1) {
          return interval + " years";
      }
      interval = Math.floor(seconds / 2592000);
      if (interval > 1) {
          return interval + " months";
      }
      interval = Math.floor(seconds / 86400);
      if (interval > 1) {
          return interval + " days";
      }
      interval = Math.floor(seconds / 3600);
      if (interval > 1) {
          return interval + " hours";
      }
      interval = Math.floor(seconds / 60);
      if (interval > 1) {
          return interval + " minutes";
      }
      return Math.floor(seconds) + " seconds";
  };

  var is_own = function(who){
    if(initial_nick==who){
      return true;
    } else {
      return false;
    }
  };

  return {
    init: init,
    handleNewMessage: handleNewMessage,
    is_own: is_own,
    timeSince: timeSince
  };

}) (Prox);
