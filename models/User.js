const mongoose = require('mongoose');

const userShema = new mongoose.Schema({
    username: {
        type: 'string',
        required: true
    },
    password: {
        type: 'string',
        required: true,
    }
});

const User = mongoose.model('User', userShema);

module.exports = User;