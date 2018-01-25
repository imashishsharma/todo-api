const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/ToDoApp', (err, db) => {
    if(err){
        return console.log('Unable to connect to MongoDB Server');        
    }
    console.log("Connected to MongoDB Server");
    // db.collection('Todos').insertOne({
    //     text: 'Something to do',
    //     completed: false
    // }, (err, result) => {
    //     if(err){
    //         return console.log("Unable to insert data ", err);
            
    //     }
    //     console.log("Data inserted \n", JSON.stringify(result.ops, undefined, 2));
        
    // });

    // db.collection('Users').insertOne({
    //     name: 'Ashish',
    //     age: 25,
    //     location: 'Life Republic, Pune'
    // },(err, result) => {
    //     if(err){
    //         return console.log("Error in inserting data ", err);            
    //     }
    //     console.log(result.ops[0]._id.getTimestamp());        
    // });

    db.close();
    
});