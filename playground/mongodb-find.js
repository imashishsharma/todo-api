const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/ToDoApp', (err, db) => {
    if(err){
        return console.log('Unable to connect to MongoDB Server');        
    }
    console.log("Connected to MongoDB Server");
    
    // db.collection('Todos').find({completed: false}).toArray().then((data) => {
    //     console.log("ToDos: ");        
    //     console.log(JSON.stringify(data, undefined, 2));        
    // }, (err) => {
    //     console.log("Couldn't fetch from DB");        
    // });

    // db.collection('Todos').find({}).count().then((count) => {
    //     console.log(`ToDos Count : ${count}`);         
    // }, (err) => {
    //     console.log("Couldn't fetch from DB");        
    // });

    db.collection('Users')
        .find({name: 'Ashish'})
        .toArray().then((data) => {
            console.log('Users: ');
            console.log(JSON.stringify(data, undefined, 2));        
        }, (err) => {
            if(err){
                console.log("Couldn't fetch data");
            }
        });

    //db.close();
    
});