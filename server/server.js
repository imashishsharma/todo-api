const _ = require('lodash');
const express = require('express');
const bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');
const jwt = require('jsonwebtoken');

require('./config/config');
var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');
var {authenticate} = require('./middleware/authenticate');

const port = process.env.PORT;
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
        // console.log('Id is invalid');        
        return res.status(404).send();
    }
    Todo.findById(id).then((todo) => {
        if(!todo){
            // console.log("Id not found");            
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

app.patch('/todos/:id', (req, res) => {
    var id = req.params.id;
    var body = _.pick(req.body, ['text', 'completed']);

    if(!ObjectID.isValid(id)){
        return res.status(404).send("ID is invalid");
    };

    if(_.isBoolean(body.completed) && body.completed){
        body.completedAt = new Date().getTime();
    } else {
        body.completed = false;
        body.completedAt = null;
    }

    Todo.findByIdAndUpdate(id, {$set: body}, {new :true}).then((todo) => {
        if(!todo){
            return res.status(404).send("ID not found");
        };
        res.send({todo});
    }).catch((e) => res.status(400).send("Some exception occurred"));
});


//USERS

app.post('/users', (req, res) => {
    var userBody = _.pick(req.body, ['email', 'password']);
    var user = new User(userBody) ;
    user.save().then(() => {
        return user.generateAuthToken();
    }).then((token) => {
        res.header('x-auth',token).send(user);
    }).catch((e) => {
        res.status(400).send(e);        
    });
});

app.get('/users/me', authenticate, (req, res) => {
    res.send(req.user);
});

app.post('/users/login', (req, res) => {
    var body = _.pick(req.body, ['email', 'password']);

    User.findByCredentials(body.email, body.password).then((user) => {
        return user.generateAuthToken().then((token) => {
            res.header('x-auth',token).send(user);
        });
                    
    }).catch((e) => {
        console.log(e);        
        res.status(400).send({error: "Invalid Username/Password"});
    });
});

app.delete('/users/me/token', authenticate, (req, res) => {
    req.user.removeToken(req.token).then(() => {
        res.status(200).send({message: "Token removed"});
    }, () => {
        res.status(400).send({error: "Error while removing token"});
    });
});

app.listen(port, () => {
    console.log(`Server started at ${port}`);
    
});

module.exports = { app };