const {SHA256} = require('crypto-js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');


var password = 'ashishkumar';
bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(password, salt, (err, hash) => {
        console.log("Hash:", hash);
        
    });
});

var hashedPassword = '$2a$10$vZsAVk9ZDG3cFXjqeRe75uUGSYwrSay51T4.9NEwIG0JLfQS4uJtq';

bcrypt.compare(password, hashedPassword, (err, res) => {
    console.log(res);
    
})



// var data = {
//     id: 10
// };

// var token = jwt.sign(data, 'abc123');
// console.log("Token: ", token);

// var decoded = jwt.verify(token, 'abc123');
// console.log("Decoded: ", decoded);



// var msg = 'Hi user 3';
// var hash = SHA256(msg).toString();
// console.log(`Hash: ${hash}`);

// data = {
//     id: 4
// };

// token = {
//     data,
//     hash: SHA256(JSON.stringify(data)+ 'somesecret').toString()
// }

// token.data.id =5;

// resultHash = SHA256(JSON.stringify(data)+ 'somesecret').toString();

// if(resultHash === token.hash){
//     console.log("data was not manipulated");
    
// } else{
//     console.log("Dont trust, data was changed");
    
// }