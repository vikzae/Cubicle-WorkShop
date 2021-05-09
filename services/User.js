const User = require('../models/User');

const Create = (username, password) => {
    let user = new User({
        username: username,
        password: password
    });

    return user.save()
};

module.exports = {
    create: Create,
};