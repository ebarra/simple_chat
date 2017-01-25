/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
	new: function(req, res) {
		// Response the view with the action's name.
    console.log("UserController 'new' action");
		return res.view();
	},
  create: function(req, res) {
    console.log("UserController CREATE action");
    User.create(req.body).exec(function(err, result){
      if (err) {
        //ways to handle error
        // http://stackoverflow.com/questions/22572315/how-to-raise-custom-error-message-in-sails-js
        req.session.flash = {err: err};
        res.serverError(err);
      }
      console.log("USUARIO CREADO CON EXITO, ponemos el flash");
      req.session.flash = {info: "login exitoso"};
			req.session.user = {name: result.name};
      return res.redirect('/home');
    });
  }
};
