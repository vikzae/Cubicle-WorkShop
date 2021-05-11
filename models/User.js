const mongoose = require('mongoose');
const regex = /^[a-zA-Z1-9.-_]{5,}$/;
const userShema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: (name) => {
            return regex.test(name)                
            },
            message: () => {
                return `Username must be atleast 5 length long and Еnglish latters!`
            }
        }
    },
    password: {
        type: String,
        required: true,unique: true,
        validate: {
            validator: (name) => {
            return regex.test(name)                
            },
            message: () => {
                return `Password must be atleast 5 length long and Еnglish latters!`
            }
        }
    }
});

const users = mongoose.model('users', userShema);

module.exports = users;