const { Router } = require('express');
const router = Router();
const Accessory = require('../services/accessory');
const accessoryModel = require('../models/Accessory');
const cubeModel = require('../models/Cube')

router.get('/create', (req, res) => {
    res.render('createAccessory')
});

router.get('/attach/:id', async (req, res) => {
    let id = req.params.id;
    let accessory = await accessoryModel.find();
    let cube = await cubeModel.findById({_id: id});
    
    res.render('attachAccessory',{accessory: accessory, cube: cube})
});

router.post('/attach/:id', (req, res) => {
    
    Accessory.attachAccessory(req.params.id, req.body.accessory)
        .then(() => {
            res.redirect('/products')
        })

});

router.post('/create', async (req, res) => {
    let data = req.body;
    
    await Accessory.create(data);
    
    res.redirect('/products');
})

module.exports = router;