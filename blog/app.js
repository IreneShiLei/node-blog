
/**
 * Module dependencies.
 */

var app = require('express')()
var express = require('express')
  , server = require('http').createServer(app)
  , routes = require('./controller')
  , user = require('./controller/user')
  , http = require('http')
  , path = require('path')
  , flash = require('connect-flash')
  , util = require('util');



app.configure(function() {
	app.set('view engine', 'ejs');              
	app.use(flash());
	app.use(express.cookieParser());
	app.use(express.session({secret:'poynt'}));
	app.use(function (req, res, next) {
		res.locals.error = req.flash('error');
		res.locals.success = req.flash('success');
		res.locals.u = req.session.u;
		next();
	});
	app.use(express.favicon());
	app.use(express.logger('dev'));
	app.use(express.bodyParser());
	app.use(express.methodOverride());
	app.use(app.router);
	
	app.use(express.static(path.join(__dirname, 'public')));

	if ('development' == app.get('env')) {
	  app.use(express.errorHandler());
	}
	user(app);
	routes(app);
});
server.listen(3000);