const mongoose = require('mongoose');

const User = mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
    },
    ClientId: {
        type: String,
        required: true
    },
    ClientSecret: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('User', User)