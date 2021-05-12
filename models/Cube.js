const mongoose = require('mongoose');
const regexCube = /^[a-zA-Z1-9.-_\s]{5,}$/;
const regexDescription = /^[a-zA-Z1-9.-_\s]{20,}$/;
const CubeShema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: (name) => {
            return regexCube.test(name)                
            },
            message: () => {
                return `Cube must be atleast 5 length long and Еnglish latters!`
            }
        }
    },
    description: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: (description) => {
            return regexDescription.test(description)                
            },
            message: () => {
                return `Description must be atleast 5 length long and Еnglish latters!`
            }
        }
    },
    imageUrl: {
        type: String,
        required: true,
        validate: /^https?/
    },
    level: {
        type: Number,
        required: true,
        min: 1,
        max: 6
    },
    accesories: [{
        type: mongoose.Types.ObjectId,
        ref: 'accessory'
    }],
    users: [{
        type: mongoose.Types.ObjectId,
        required: true,
        ref: 'users'
    }],
});

const Cube = mongoose.model('Cube', CubeShema);
module.exports = Cube;