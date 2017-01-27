/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
	show: function(req, res) {
		// Response the view with the action's name.
    console.log("Show de HomeControllerrrrrrrrrrrrrrrrrrrrrrrrrrrrr");
		console.log(req.session);
    if(!req.session || !req.session.user || req.session.path==="/home"){
    	req.session.flash = {info: "Debe loguear para poder acceder al chat"};
    	res.redirect("/");
    }
		req.session.path = "/home";
		return res.view();
	}
};
