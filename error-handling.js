// Load Express module
var express 	= require('express');
var bodyParser 	= require('body-parser');
var methodOverride = require('method-override');
var app 		= express();
var port 		= 3000;

app.use(bodyParser.urlencoded({extended: true})); // parse application/x-www-form-urlencoded
app.use(bodyParser.json()); //parse application/json
app.use(methodOverride());
app.use(clientErrorHandler);
app.use(errorHandler);

function logErrors(err, req, res, next){
	console.error(err.stack);
	next(err);
}

function clientErrorHandler (err, req, res, next) {
  if (req.xhr) {
    res.status(500).send({ error: 'Something failed!' })
  } else {
    next(err)
  }
}

function errorHandler (err, req, res, next) {
  if (res.headersSent) {
    return next(err)
  }
  res.status(500)
  res.render('error', { error: err })
}

// respond with "Hello World!" on the homepage
app.get('/', function(req, res){
	res.send('Hello World!');
});

// Listen
app.listen(port);
console.log('App listening on port ' + port);
