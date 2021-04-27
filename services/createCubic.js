const Cubic = require('../models/Cubic.js');
let db = require('../config/database');
const uniqid = require('uniqid');
const fs = require('fs');

function getAll() {
    return db
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

    fs.writeFile(__dirname + '/../config/database.json',JSON.stringify(db), (err) => {
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
