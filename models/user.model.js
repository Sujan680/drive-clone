const mongoose = require('mongoose');

// Create a schema for the user model 
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
 
// Create a model for the user schema 
const user = mongoose.model('user', userSchema);

// Export the user model to be used in the user.routes.js file
module.exports = user;
