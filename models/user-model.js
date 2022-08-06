const { Schema, model } = require('mongoose');


const userSchema = new Schema({
    firstname : {
        type : String,
        require : true,
        trim : true
    },
    lastname : {
        type : String,
        require : true,
        trim : true
    },
    email : {
        type : String,
        unique : true,
        require : true,
        trim : true
    },
    password : {
        type : String,
        require : true
    },
    adress : {
        type : String
    },
    role : {
        type : String,
        enum : ['User', 'Moderator', 'Admin'],
        required : true,
        default : 'User'
    }
}, {
    collection : 'User',
    timestamps : true
});


const User = model('User', userSchema);
module.exports = User;