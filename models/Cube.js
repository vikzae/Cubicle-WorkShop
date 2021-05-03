const mongoose = require('mongoose');
const Accessory = require('./Accessory');

const CubeShema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
        max: 50,
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
        ref: 'Accessory'
    }]
});

const Cube = mongoose.model('Cube', CubeShema);
module.exports = Cube;