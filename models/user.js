const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        minLength: 2,
        maxLength: 30,
        default: '',
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: (mail) => validator.isEmail(mail),
        },

    },
    password:{
        type:String,
        required: true,
        select:false
    }
})

module.exports = mongoose.Schema('user', userSchema);