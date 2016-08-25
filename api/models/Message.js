/**
 * User
 *
 * @module      :: Model
 * @description :: A short summary of how this model works and what it represents.
 *
 */

module.exports = {

  schema: true,
  autosubscribe: [],
  attributes: {
    author: {
      type: 'string',
      required: true
    },
    text: {
      type: 'string',
      required: true
    }
  }

};
