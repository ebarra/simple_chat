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
		req.session.path="/";
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
      console.log(result);
      req.session.user = result;
      req.session.flash = {info: "login exitoso"};
      User.publishCreate(result.toJSON(), req);
      return res.redirect('/home');
    });
  },
  destroy: function(req, res, next) {
    console.log("UserController DESTROY action");
		var id = req.param('id');
		// Id is needed, otherwise not found (status 404).
		if( !id ) return res.notFound();
		// Find the user by id.
		User.update(id, {"status": "offline"}).exec(function updated(err, records) {
			// Because this should only update a single record and update
      // returns an array, just use the first item.  If more than one
      // record was returned, something is amiss.
      if (!records || !records.length || records.length > 1) {
        console.log('ERROR Unexpected output from update, records array bad!');
      }
      if ( err ) return next(err);
      var updatedRecord = records[0];
      console.log("UPDATED USER: ", updatedRecord);
      User.publishDestroy(id, req, {previous: updatedRecord});
			// Response JSON if needed.
		  if (req.wantsJSON) return res.json(200);
			// Redirect to the users page.
			else return res.redirect('/');
		});
  }
};
