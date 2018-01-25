var mongoose = require('mongoose');

mongoose.Promise = global.Promise;
//mongoose.connect('mongodb://localhost:27017/TodoApp');
mongoose.connect('mongodb://system:manager@ds129374.mlab.com:29374/todoapp');

module.exports = {mongoose};