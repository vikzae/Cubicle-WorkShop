const Cubic = require('../models/Cubic.js');
let db = require('../config/database');
const uniqid = require('uniqid');
const fs = require('fs/promises');

function getAll(query) {
    let results = db

    if(query.search) {    
        results = results.filter(x => x.name.toLowerCase().includes(query.search.toLowerCase()))
    }

    if(query.from) {
        results = results.filter(x => x.difficultyLevel >= query.from)
    }

    if(query.to) {
        results = results.filter(x => x.difficultyLevel <= query.to)
    }

    return results
}

function findOne(id) {
    return db.find(x => x.id === id)
}

function create(data) {
    let cubic = new Cubic(
        uniqid(),
        data.name,
        data.description,
        data.imageUrl,
        data.difficultyLevel,
    );

    db.push(cubic);

    return fs.writeFile(
        __dirname + '/../config/database.json',
        JSON.stringify(db), (err) => {
        if (err) {
            console.log(err);
            return;
        }
    })
}

module.exports = {
    findOne,
    create,
    getAll,
};
