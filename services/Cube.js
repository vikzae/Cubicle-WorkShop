const Cube = require('../models/Cube');

const create = async (data) => {
    let cube = new Cube ({
        name: data.name,
        description: data.description,
        imageUrl: data.imageUrl,
        level: data.level,
        users: data.users
    });

    return await cube.save();
};

const getAll = async (query) => {
    let cube = await Cube.find({});

    if(query.search) {
        cube = cube.filter(x => x.name.toLowerCase().includes(query.search.toLowerCase()));
    };

    if(query.from) {
        cube = cube.filter(x => x.level >= query.from);
    };

    if(query.to) {
        cube = cube.filter(x => x.level <= query.to);
    };

    return cube 
};

const getOne = id => {
    return Cube.findById(id);
};

module.exports = {
    create: create,
    getAll: getAll,
    getOne: getOne, 
};