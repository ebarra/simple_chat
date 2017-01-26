/**
 * User
 *
 * @module      :: User
 * @description :: A short summary of how this model works and what it represents.
 *
 */

module.exports = {
  schema: true,
  //autoWatch: false,
  autosubscribe: ['destroy'],
  attributes: {
    name: {
      type: 'string',
      required: true
    },
    password: {
      type: 'string',
      required: true
    },
    gender: {
      type: 'string',
      required: false
    },
    status:{
      type: 'string',
      required: true,
      defaultsTo: "online"
    },
    // Referencia a sus mensajes (has-many)
    messages: {
      collection: 'message',
      via: 'author'
    }
  }

};
