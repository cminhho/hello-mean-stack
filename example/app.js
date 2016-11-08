// Dependencies
var express     = require('express');
var bodyParser  = require('body-parser');
var mongoose    = require('mongoose');
var app         = express();
var port        = 3000;
var database    = require('./app/config');

// Sets the connection to MongoDB
mongoose.connect(database.localtest.url);

// Populate database with sample data
require('./app/seed')

// Configuration
// app.set('views', path.join(__dirname, 'views')); // view engine setup
// app.set('view engine', 'jade');
app.use(express.static(__dirname + '/views'))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// Routes
require('./app/routes.js')(app);

// Error handler

// Listen
app.listen(port);
console.log('App listenning on port ' + port);
