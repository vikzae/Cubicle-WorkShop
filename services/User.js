const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const saltRounds = 1;
const secret = 'muchSecret';


const create = async (username, password) => {
    let user = new User({
        username: username,
        password: password
    });
    return await user.save()
};

const hashPassword = (password) => {
    return bcrypt.hash(password, saltRounds)
};

const login = async (username, password) => {
    let user = await User.findOne({username});
    if (!user) throw 'User not found!';

    let isMatched = await bcrypt.compare(password,user.password);
    if (!isMatched) throw 'Wrong password';

    let token = jwt.sign({_id: user._id,username: user.username}, secret);
    return token
};

const sumNubers = () => {
    console.log('sup');
};

const sumCbues = () => {
    console.log('sumCubes');
}

module.exports = {
    login: login,
    create: create,
    hashPassword: hashPassword,
};