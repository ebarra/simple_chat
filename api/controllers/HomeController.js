/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
	show: function(req, res) {
		// Response the view with the action's name.
    console.log("Show de HomeController")
		return res.view();
	}
};
