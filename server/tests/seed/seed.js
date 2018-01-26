var {ObjectID} = require('mongodb');
var {Todo} = require('./../../models/todo');

const todos = [{
    _id: new ObjectID(),
    text: "Some seed data test1"
}, {
    _id: new ObjectID(),
    text: "Some seed data test2",
    completed: true,
    completedAt: 345
}];

const populateTodos = (done) => {
    Todo.remove({}).then(() => {
      return Todo.insertMany(todos);
    }).then(() => done());
  };

module.exports = {todos, populateTodos};