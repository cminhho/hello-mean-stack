// Load Express module
var express = require('express');
var app = express();
var port = 3000;

// Middleware
var myLogger = function(req, res, next){
	req.requestTime = Date.now();
	console.log('LOGGED: ' + Date.now());
	next();
};

app.use(myLogger);

app.use(function (err, req, res, next) {
  console.error(err.stack)
  res.status(500).send('Something broke!')
});

// respond with "Hello World!" on the homepage
app.get('/', function(req, res){
	var responseText = 'Hello World!<br/><strong>' + req.requestTime + '</strong>';
	res.send(responseText);
});

// accept POST request on the homepage
app.post('/', function (req, res) {  
  res.send('Got a POST request');
});

// accept PUT request at /user
app.put('/user', function (req, res) {  
  res.send('Got a PUT request at /user');
});

// accept DELETE request at /user
app.delete('/user', function (req, res) {  
  res.send('Got a DELETE request at /user');
});


// Route parameters
app.get('/users/:userId/todo/:todoId', function(req, res){
	res.send(req.params);
});

app.get('/error', function(req, res){
	res.status(500).json({error: 'message'});
});

// Route handlers
app.get('/example/a', function(req, res, next){
	console.log('the response will be sent by the next function ...');
	next();
}, function(req, res){
	console.log('BHello from B');
	res.send('Hello from B');
});

// Resonse methods
app.get('/download', function(req, res){
	res.download('main.js');
	res.download('main.js','package.json');
	res.download('main.js','package.json', function(err){
		if(err){
			// Handle error
		}else{
			
		}
	});
})

// Listen
app.listen(port);
console.log('App listening on port ' + port);
