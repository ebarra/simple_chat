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
        io.socket.get(_usersApiUrl + "?status=online&sort=createdAt%20DESC", function(users) {
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
      } else {
        console.log("first_connection era false, ya teniamos socket conectado");
      }
    });

    io.socket.on('message', function messageNotificationReceivedFromServer( message ) {
      console.log("MESSAGE notification through the socket");
      var templ = JST["assets/templates/chat_elem.html"];
      $("#chat_wrap").prepend(templ(message.data));
    });
    
    io.socket.on('user', function userNotificationReceivedFromServer( message ) {
      console.log("USER notification through the socket");
      console.log(message);
      switch (message.verb) {
        case 'created':
          //en el create el message es Object {verb: "created", data: Object, id: 105}
          add_user(message.data); 
          break;
        case 'destroyed':
          //en el destroy me mandan message que es: Object {verb: "destroyed", id: "105", previous: Object}
          remove_user(message.id);
          break;
        default:
          break;
      }
      
    });
  };
  
  var get_user = function(){
    if(user){
      return user;
    } else {
      return "No hay ningún usuario logueado en esta sesión";
    }
  };
  
  var add_user = function(user){
    var templ = JST["assets/templates/user_elem.html"];
    $("#friends_wrap").prepend(templ(user));
  };
  
  var remove_user = function(id){
    $("#user-"+id).hide();
  };

  return {
    get_user: get_user,
    init: init,
    handleNewMessage: handleNewMessage
  };

}) (Prox);
