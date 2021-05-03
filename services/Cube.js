const Cube = require('../models/Cube');

const create = data => {
    let cube = new Cube ({
        name: data.name,
        description: data.description,
        imageUrl: data.imageUrl,
        level: data.level,
    });
    
    cube.save();

    return  cube;
};
// sort to add
const getAll = data => {
    return Cube.find({}).lean();
};

const getOne = id => {
    return Cube.findById(id)
};

module.exports = {
    create: create,
    getAll: getAll,
    getOne: getOne, 
};