const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/ToDoApp', (err, db) => {
    if(err){
        return console.log('Unable to connect to MongoDB Server');        
    }
    console.log("Connected to MongoDB Server");
    
    //TODOS
    db.collection('Todos').findOneAndUpdate({
            _id: new ObjectID('5a69ab5cae4be5007852d36d')
        }, {
            $set: { completed : true }
        }, {
            returnOriginal: false
        }).then((result) => {
            console.log(result);            
    });

    //USERS
    db.collection('Users').findOneAndUpdate({
            _id: new ObjectID('5a69a5a4ae4be5007852d368')
        }, {
            $set : { name: 'Ashish Sharma'},
            $inc : { age: 1 }
        }, {
            returnOriginal: false
        }).then((result) => {
            console.log(result);            
    });

    //db.close();
    
});