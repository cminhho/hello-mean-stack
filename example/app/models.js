var mongoose = require('mongoose');

// Create a Todo schema
var TodoSchema = new mongoose.Schema({
  title: {type: String, require: true},
  created_at: {type: Date, default: Date.now},
  updated_at: {type: Date, default: Date.now}
});

// Set the created_at parameter equal to the current time
TodoSchema.pre('save', function(next){
  now = new Date();
  this.updated_at = now;
  if(!this.created_at){
    this.created_at = now;
  }
  next();
});


module.exports = mongoose.model('Todo', TodoSchema);
