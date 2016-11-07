/**
Mongoosee is a MongoDB object modelling tool desinged to work in an asynchronous environment
http://mongoosejs.com/

Installation
$ npm install mongoose
**/

// Load mongoose module
var mongoose = require('mongoose');

var db = mongoose.connection;

var MONGO_URL = 'mongodb://localhost/hello-mean';

function callback(err, data){
	if(err) console.error(err);
	console.log(data);
}

db.on('error', console.error);

db.once('open', function(){
	// mongo connected
	console.log('Mongo connected!');
	
	var time = new Date(),
		now = new Date(),
		oneWeekAgo = time.setDate(time.getDate() - 7);
	
	// Create scheman and models
	var TodoSchema = new mongoose.Schema({
		title: {type: String, required: true},
		completed: {type: Boolean},
		created_at: {type: Date, default: Date.now},
		updated_at: {type: Date, default: Date.now}
	});
	
	/**
	 * Constructing documents
	 * Documents are instances of our model
	 **/
	
	// Access the model - Retrive model
	var Todo = mongoose.model('Todo', TodoSchema);
	
	// Create a document 
	var todo = new Todo({
		title: 'Hello Mongoose',
		completed: true
	});
	
	// Store a document
	function createDocument(){
		todo.save(callback);
	}

	function Middleware(){
		// Sets the created_at parameter equal to the current time
		TodoSchema.pre('save', function(next){
			now = new Date();
			this.update_at = now;
			if(this.created_at){
				this.created_at = now;
			}
			next();
		});
	}
	
	/**
	 * Quering
	 * Documents can be retrived using each models: find, findById, findOne or where static method
	 **/
	
	// Get all document in collections
	function findAllDocuments(){
		Todo.find(callback);
	}
	
	// Find a document in collection
	function findADocument(){
		Todo.findOne({title: 'Hello Mongoose'}, callback);
	}
	
	// Query conditions 
	function queryConditions(){
		Todo.find({title: 'Hello Mongoose', completed: true}, callback);
	}
	
	function queryBuilder(){
		var query = Todo.find({});
		query
		.where('created_at').gte(oneWeekAgo)
		.where('created_at').lte(now)
		.where('title').equals('Hello Mongoose');
		
		// Execute query and return the query results
		query.exec(callback);
	}
	
	// Find document by Id
	function finDocumentById(){
		Todo.findById(callback);
	}
	
	// Query with a JSON doc
	function queryWithAJSONDoc(){
		Todo.find({
			created_at: { $gte: oneWeekAgo, $lte: now}
		})
		.limit(2)
		.sort({title: -1})
		.select({title: 1})
		.exec(callback);
	}
	
	/**
	 * Removing
	 * Models have a static remove method available for removing all documents matching conditions
	 * Documents can be retrived using each models: remove, findByIdAndRemove
	 **/
	function remove(){
		Todo.remove({title: 'Hello Mongoose'}, callback);
	}
	
	/**
	 * Updating
	 * Each model has its own update method for modifying documents in the db without  returning them to your application
	 * USE: update, findOneAndUpdate
	 **/
	 function update(){
		Todo.update({title: 'Hello Mongoose'}, { $set: {title: 'Hello Mongoose Updated'}}).exec();
	 }
	 
	 function updateById(id){
		Todo.findById(id, function(err, todo){
			if(err) return console.log(err);
			todo.title = 'Hello World!';
			todo.save(callback);
		});
	 }
	 
});

// Connect to mongodb
mongoose.connect(MONGO_URL);
