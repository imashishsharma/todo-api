var express = require('express');
var bodyParser = require('body-parser');
var {ObjectID} = require('mongodb');

var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');

const port = process.env.PORT || 3000;
var app = express();

app.use(bodyParser.json());

app.post('/todos', (req, res) => {
    var todo = new Todo({
        text: req.body.text
    });

    todo.save().then((doc) => {
        res.send(doc);
    }, (e) => {
        res.status(400).send(e);        
    });
});

app.get('/todos', (req, res) => {
    Todo.find().then((todos) => {
        res.send({todos});
    }, (e) => {
        res.status(400).send(e);
    });
});

app.get('/todos/:id', (req, res) => {
    var id = req.params.id;
    if(!ObjectID.isValid(id)){
        console.log('Id is invalid');        
        return res.status(404).send();
    }
    Todo.findById(id).then((todo) => {
        if(!todo){
            console.log("Id not found");            
            return res.status(404).send();
        }
        res.send({todo});
    }).catch((e) => res.status(400).send());
});

app.delete('/todos/:id', (req, res) => {
    var id = req.params.id;
    if(!ObjectID.isValid(id)){
        return res.status(404).send("ID is invalid");
    };
    Todo.findByIdAndRemove(id).then((todo) => {
        if(!todo){
            return res.status(404).send("ID not found");
        };
        res.status(200).send({todo});
    }).catch((e) => res.status(400).send("Some exception occurred"));
});


app.listen(port, () => {
    console.log(`Server started at ${port}`);
    
});

module.exports = { app };