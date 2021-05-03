const mongoose = require('mongoose');
const Cube = require('./Cube');

const AccessoryShema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String,
        required: true,
        validation: /^https?/
    },
    description: {
        type: String,
        required: true,
        max: 50,
    },
    cubes: [{
        type: mongoose.Types.ObjectId,
        ref: 'Cube'
    }]
});

const Accessory = mongoose.model('Accessory', AccessoryShema);

module.exports = Accessory;