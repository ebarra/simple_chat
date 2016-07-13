/*
 * Proximity Search Module
 */
Prox.Chat = (function(P,undefined){

  var handleNewMessage = function() {
      console.log("handleNewMessage function");
      event.preventDefault();

      return false;
  };


  return {
    handleNewMessage : handleNewMessage
  };

}) (Prox);
