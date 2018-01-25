var mongoose = require('mongoose');

var User = mongoose.model('User', {
    email: {
        type: String,
        required: true,
        minlength: 1,
        trim: true
    }
});

module.exports = { User };




// var newUser = new user({
//     email: ' '
// });

// newUser.save().then((doc) => {
//     console.log("User added ", doc);
    
// }, (err) => {
//     console.log('Error adding user', err);
    
// })