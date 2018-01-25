var {ObjectID} = require('mongodb');

var {User} = require('./../server/models/user');
var {mongoose} = require('./../server/db/mongoose');

var id = '5a69c79e5e2631036835f963';

if(!ObjectID.isValid(id)){
    return console.log('Invalid id');
}

User.findById(id).then((user) => {
    if(!user){
        return console.log('Id not found');
    }
    console.log(user);
});