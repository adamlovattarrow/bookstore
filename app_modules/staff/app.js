/*
|----------------------------------------------------------------------
| /app_modules/staff/app.js
|----------------------------------------------------------------------
|
| -Staff Module-
|
| Encapsulates views, routes, controls relating to the staff 
| functionality of the application.
|
*/

var express = require('express'),
    expressValidator = require('express-validator'),
    flash = require('connect-flash'),
    fs = require('fs'),
    app_middleware = require('./app_middleware');

// create and export and express server
app = module.exports = express.createServer();

// Configuration
app.configure(function(){
 // set view template directory
  app.set('views', __dirname + '/views');
  // set view engine to jade
  app.set('view engine', 'jade');
  // disable auto layouts
  app.set('view options', { layout: false });

  // use express middleware
  app.use(express.bodyParser());
  app.use(expressValidator);
  app.use(express.methodOverride());
  app.use(express.cookieParser());
  app.use(express.session({ secret: 'secret-admin' }));

  // use flash middleware
  app.use(flash());

  // use custom middleware
  app.use(app_middleware.init);
  app.use(app_middleware.login.load);
  app.use(app_middleware.flash.load);
  app.use(app_middleware.valErrors.load);

  // use router
  app.use(app.router);
  // publish static folder
  app.use(express.static(__dirname + '/public'));
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function(){
  app.use(express.errorHandler());
});

// load our routes-controllers
require('./routes');

