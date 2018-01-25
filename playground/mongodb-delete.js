const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/ToDoApp', (err, db) => {
    if(err){
        return console.log('Unable to connect to MongoDB Server');        
    }
    console.log("Connected to MongoDB Server");
    
    //TODOS
    //deleteMany
    // db.collection('Todos').deleteMany({text: 'Eat Lunch'}).then((result) =>{
    //     console.log(result);        
    // });

    //deleteOne
    // db.collection('Todos').deleteOne({text:'Eat Lunch'}). then((result) => {
    //     console.log(result);        
    // });

    //findOneAndDelete
    // db.collection('Todos').findOneAndDelete({completed: false}).then((result) => {
    //     console.log(result);        
    // })


    //USERS
    //deleteMany
    // db.collection('Users').deleteMany({name: 'Ashish'}).then((result) =>{
    //     console.log(result);        
    // });

    //deleteOne
    // db.collection('Todos').deleteOne({text:'Eat Lunch'}). then((result) => {
    //     console.log(result);        
    // });

    //findOneAndDelete
    db.collection('Users').findOneAndDelete({_id: ObjectID("5a69919dec3afd2ee8c6c7a1")}).then((result) => {
        console.log(result);        
    })

    //db.close();
    
});