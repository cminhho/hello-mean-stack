// Dependencies
var Todo       = require('./models.js')

// Open App routes
module.exports = function(app){
  // GET Routes
  // -------------------------------------
  // Retrieve records for all todos in the db
  app.get('/api/todos', function(req, res){
    // Uses Mongoose Schema to run the search
    var query = Todo.find({});
    query.exec(function(err, data){
      if(err){
        res.send(err);
      } else{
        res.json(data);
      }
    });
  });

  // GET Routes
  // -------------------------------------
  // Retrieve records for all todos in the db
  app.post('/api/todos', function(req, res){
    // Uses Mongoose Schema to run the search
    var newTodo = new Todo(req.body);
    newTodo.save(function(err, data){
      if(err){
        res.send(err);
      }else{
        res.json(req.body);
      }
    })
  });


};
