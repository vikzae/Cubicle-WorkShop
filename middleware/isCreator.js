const cubeModel = require('../models/Cube')

const isCreator = async (req, res, next) => {
    let id = req.params.id;

    cubeModel.findById(id).populate('users').populate('accesories')
        .then((data) => {
            req.creator = false;
            let user = data.users[0];

            if (req.user._id == user._id) {
                req.creator = true;
            }
            req.cube = data;
            next();
        })
    }



module.exports = isCreator