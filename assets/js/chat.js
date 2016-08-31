/*
 * Proximity Chat Module
 */

Prox.Chat = (function(P,undefined){

  var _messagesApiUrl = "/message";
  var _usersApiUrl = "/user";
  var user = "";
  var first_connection = true;

  var handleNewMessage = function() {
      console.log("handleNewMessage function");
      event.preventDefault();
      console.log("USERID: " + user.id);
      var newMessage = {author: user.id, text: $("#myarea").val()};
      io.socket.post(_messagesApiUrl, newMessage, function (resData, jwres){
        console.log("created resData es:");
        console.log(resData);
        var templ = JST["assets/templates/chat_elem.html"];
        $("#chat_wrap").prepend(templ(resData));
      });
      return false;
  };

  var init = function(logged_user){
    console.log("logged_user:", logged_user);
    user = logged_user;

    //var socket = io.connect();

    io.socket.on('connect', function() {
      if(first_connection){
        console.log("PRIMERA CONEXION, vamos a pedir los mensajes");
        first_connection = false;
        io.socket.get(_messagesApiUrl + "?sort=createdAt%20DESC", function(messages) {
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
        io.socket.get(_usersApiUrl + "?sort=createdAt%20DESC", function(users) {
          console.log({users: users});
          var arrayLength = users.length;
          var templ = JST["assets/templates/user_elem.html"];
          for (var i = 0; i < arrayLength; i++) {
              //he creado una función timeSince y accedo a ella desde la vista
              //otras alternativas serían extender el objeto que se le pasa, o con los datos o con un helper
              //https://lostechies.com/derickbailey/2012/04/26/view-helpers-for-underscore-templates/
              $("#friends_wrap").append(templ(users[i]));
          }
        });
      }
    });

    io.socket.on('message', function notificationReceivedFromServer ( message ) {
      console.log("created");
      var templ = JST["assets/templates/chat_elem.html"];
      $("#chat_wrap").prepend(templ(message.data));

    });
  };
  
  var get_user = function(){
    if(user){
      return user;
    } else {
      return "No hay ningún usuario logueado en esta sesión";
    }
  };

  return {
    get_user: get_user,
    init: init,
    handleNewMessage: handleNewMessage
  };

}) (Prox);
