const User = require('../models/User');
let bcrypt = require('bcrypt');
const saltRounds = 1;

const create = (username, password) => {
    let user = new User({
        username: username,
        password: password
    });

    return user.save()
};
const hashPasswordAndCreateUser = (username,password) => {
    bcrypt.hash(password, saltRounds)
    .then((hashedPassword) => {
    create(username, hashedPassword);
    });
}

module.exports = {
    create: create,
    hashPasswordAndCreateUser: hashPasswordAndCreateUser,
};