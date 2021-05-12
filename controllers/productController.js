const { Router } = require('express');
const router = Router();
const cube = require('../services/Cube');
const cubeModel = require('../models/Cube');
const auth = require('../middleware/auth');
const isCreator = require('../middleware/isCreator')

router.get('/', auth, (req, res) => {
    cube.getAll(req.query)
        .then((data) => {
            res.render('index', { products: data, user: req.user });
        });
});

router.get('/create', auth, (req, res) => {
    res.render('create', { user: req.user });
});

router.get('/edit/:id', auth, isCreator, async (req, res) => {
    if (req.creator) {
        let cube = req.cube;
        res.render('editCube', { cube: cube, user: req.user });
        return;
    }
    res.redirect('/products');
});

router.get('/delete/:id', auth, isCreator, (req, res) => {
    let cubeId = req.params.id;
    if (req.creator) {
        cubeModel.findByIdAndRemove(cubeId)
            .then(() => {
                res.redirect('/products');
            })
    }
    res.redirect('/products');
});

router.get('/details/:id', auth, isCreator, (req, res) => {
    res.render('details', { product: req.cube, accessory: req.cube.accesories, user: req.user, creator: req.creator });

});

router.post('/edit/:id', (req, res) => {
    let cube = req.body;
    cubeModel.findOneAndUpdate({ _id: req.params.id }, cube, { returnNewDocument: true })
        .then(() => {
            res.redirect('/products')
        })
})

router.post('/create', auth, async (req, res) => {
    let { name, description, imageUrl, level } = req.body;
    let user = req.user;
    try{
        let newCube = await cube.create({
            name: name,
            description: description,
            imageUrl: imageUrl,
            level: level,
            users: user,
        });
        res.redirect('/products')
    } catch(err){
        let error = Object.keys(err.errors).map(x => err.errors[x].properties.message);

        res.render('create', {error})
    }
});


module.exports = router;