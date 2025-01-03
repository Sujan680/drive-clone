const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        minlength: [4, 'Username must be at least 4 characters long']
    },

    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        minlength: [ 13, 'Email must be at least 13 characters long']
    },
    password: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        minlength: [6, 'Password must be at least 6 characters long']
    }
})

const user = mongoose.model('user', userSchema);
module.exports = user;
