const mongoose = require('mongoose');
const Accessory = require('../models/Accessory');
const Cube = require('../models/Cube');

const create = data => {
    let accessory = new Accessory({
        id : mongoose.Types.ObjectId(),
        name: data.name,
        description: data.description,
        imageUrl: data.imageUrl,
    });
    
    return accessory.save();
}

const getAll = () => {
    return Accessory.find({});
}

const getOne = id => {
    return Accessory.findById(id);
};

const attachAccessory = async (cubeId, accessoryId) => {
    let cube = await Cube.findById(cubeId);
    let accessory = await Accessory.findById(accessoryId);

    cube.accesories.push(accessory);
    return cube.save();
};
module.exports = {
    create: create,
    getAll: getAll,
    getOne: getOne,
    attachAccessory: attachAccessory,
};