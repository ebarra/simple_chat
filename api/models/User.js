/**
 * User
 *
 * @module      :: User
 * @description :: A short summary of how this model works and what it represents.
 *
 */

module.exports = {

  schema: true,

  attributes: {
    name: {
      type: 'string',
      required: true
    },
    nick: {
      type: 'string',
      required: true
    },
    gender: {
      type: 'string',
      required: true
    },
    avatar_url: {
      type: 'string',
      required: true
    }
  }

};
