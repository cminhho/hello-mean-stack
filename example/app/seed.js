var Todo = require('./models');
Todo.find({}).remove();

var todo = new Todo({title: 'Hello Express'});
todo.save();
