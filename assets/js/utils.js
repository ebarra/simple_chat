/*
 * Proximity Utils Module
 */

Prox.Utils = (function(P,undefined){

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

  var is_same = function(message_author){
    var user = P.Chat.get_user();
    //no comparo user con message_author con === entre ellos porque no son el mismo objeto y da false, comparo los ids
    if(message_author.id===user.id){
      return true;
    } else {
      return false;
    }
  };

  

  return {
    is_same: is_same,
    timeSince: timeSince
  };

})(Prox);
