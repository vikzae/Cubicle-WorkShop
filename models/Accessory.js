const mongoose = require('mongoose');
const Cube = require('./Cube');
const regexAccesories = /^[a-zA-Z1-9.-_\s]{5,}$/;
const regexDescription = /^[a-zA-Z1-9.-_\s]{20,}$/;

const AccessoryShema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: (name) => {
            return regexAccesories.test(name)                
            },
            message: () => {
                return `Accesory must be atleast 5 length long and Еnglish latters!`
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
        validation: /^https?/
    },
});

const Accessory = mongoose.model('accessory', AccessoryShema);

module.exports = Accessory;