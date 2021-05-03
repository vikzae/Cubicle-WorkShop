const { Router } = require('express');
const router = Router();
const cube = require('../services/Cube');
const accessory = require('../services/Accessory');
const cubeModel = require('../models/Cube')

router.get('/', async (req, res) => {
    
    let products = await cube.getAll(req.query);
    res.render('index',{products: products})
});

router.get('/create', (req, res) => {
    res.render('create')
});

router.post('/create', (req, res) => {
    let data = req.body;

    cube.create(data)
        .then(() => {res.redirect('/products')})
    
});

router.get('/details/:id',async (req, res) => {
    let id = req.params.id;
    let product = await cubeModel.findById(id).populate('accesories')
        
    res.render('details',{product: product,accessory: product.accesories});
});

module.exports = router;