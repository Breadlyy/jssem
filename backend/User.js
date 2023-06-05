const {Schema, model} = require('mongoose')

//user schema for saving user in db
 const User = new Schema(
    {
        firstname: {type: String , unique: false, required: true},
        lastname: {type: String , unique: false, required: true},
        email: {type: String , unique: true, required: true},
        phone: {type: String , unique: true, required: true},
        password: {type: String , unique: true, required: true},
        avatar: {type: String , unique: false, required: false},
    }
)

module.exports = model('User', User);