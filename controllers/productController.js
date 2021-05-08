const { Router } = require('express');
const router = Router();
const cube = require('../services/Cube');
const cubeModel = require('../models/Cube');
const auth = require('../middleware/auth');

router.get('/',auth,(req, res) => {
    cube.getAll(req.query)
        .then((data) => {
            res.render('index',{products: data,user:req.user});
        });
});

router.get('/create', auth, (req, res) => {
    res.render('create', {user: req.user});
});

router.get('/edit/:id', async (req, res) => {
    let cube = await cubeModel.findOne({_id: req.params.id})
    
    res.render('editCube', {cube: cube})
});

router.get('/delete/:id', (req,res) => {
    let cubeId = req.params.id;

    cubeModel.findByIdAndRemove(cubeId)
        .then(() => {
            res.redirect('/products')
        })
});

router.post('/edit/:id', (req, res ) => {
    let cube = req.body;
    cubeModel.findOneAndUpdate({_id: req.params.id}, cube, {returnNewDocument: true})
        .then(() => {
            res.redirect('/products')
        })
})

router.post('/create', (req, res) => {
    let data = req.body;

    cube.create(data)
        .then(() => {res.redirect('/products')});
});

router.get('/details/:id', auth,(req, res) => {
    let id = req.params.id;
    
    cubeModel.findById(id).populate('accesories')
        .then((data) => {
            res.render('details',{product: data, accessory: data.accesories, user: req.user});
        })
    
});

module.exports = router;