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

const users = mongoose.model('users', userShema);

module.exports = users;