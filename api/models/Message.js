/**
 * User
 *
 * @module      :: Model
 * @description :: A short summary of how this model works and what it represents.
 *
 */

module.exports = {

  schema: true,
  //autoWatch: false, //http://blog.spoonx.nl/qa-autowatch-false-still-pushes-updates-sails-js/
  autosubscribe: [],
  attributes: {
    text: {
      type: 'string',
      required: true
    },
    // Una referencia a usuario, un usuario tiene muchos (has-many) mensajes
    author: {
      model: 'user'
    }
  }

};
