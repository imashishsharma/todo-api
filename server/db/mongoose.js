var mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/TodoApp');
//mongoose.connect('mongodb://system:manager@ds129374.mlab.com:29374/todoapp');

module.exports = {mongoose};