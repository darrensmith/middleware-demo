/*!
* Middleware Demo Project
*
* Copyright (c) 2020 Darren Smith
* Licensed under the LGPL license.
*/

;!function(undefined) {

	/**
	 * Core Application
	 */
	var app = (function(req, res) {
		var stackCounter = 0;
		return function (req, res) {
			app.stack[stackCounter](req, res, function(){
				stackCounter++;
				if(app.stack[stackCounter]) { app(req, res) }
				else { app.handler(req, res) }
			});
		}
	})();
	app.stack = [];
	app.handler = null;
	app.use = function(fn) { app.stack.push(fn) };
	app.handle = function(fn) { app.handler = fn }


	/**
	 * Sample Middleware 1
	 */
	app.use(function(req, res, next){
		req.where = "now";
		next();
	});


	/**
	 * Sample Middleware 2
	 */
	app.use(function(req, res, next){
		req.about = "apple";
		next();
	});


	/**
	 * Sample Middleware 3
	 */
	app.use(function(req, res, next){
		req.tree = "green";
		next();
	});


	/**
	 * Final Handler / Controller
	 */
	app.handle(function(req, res) {
		console.log("Controller", req);
	});


	/**
	 * Incoming Request (could be from an HTTP Server)
	 */
	var init = function(){
		var req = { seed: true };
		var res = {};
		app(req, res);
		return;
	}

	/**
	 * Initialise Demo
	 */
	init();

}();