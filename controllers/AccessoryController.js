const { Router } = require('express');
const router = Router();
const Accessory = require('../services/accessory');
const accessoryModel = require('../models/Accessory');
const cubeModel = require('../models/Cube');
const auth = require('../middleware/auth');

router.get('/create', auth, (req, res) => {
    res.render('createAccessory',{user:req.user});
});

router.get('/attach/:id', auth, async (req, res) => {
    let id = req.params.id;
    let cube = await cubeModel.findById(id);
    let accessory = await accessoryModel.find({_id: {$nin: cube.accesories}});

    res.render('attachAccessory',{accessory: accessory, cube: cube, user:req.user})
});

router.post('/attach/:id', (req, res) => {
    
    Accessory.attachAccessory(req.params.id, req.body.accessory)
        .then(() => {
            res.redirect('/products');
        })

});

router.post('/create',  (req, res) => {
    let data = req.body;
    
    Accessory.create(data)
        .then((data) => {
            res.redirect('/products');
        })
    
})

module.exports = router;