const { Router } = require('express');
const createCubic = require('../services/createCubic.js');

const router = Router();

router.get('/',(req, res) => {
     res.render('index',{products: createCubic.getAll});
});

router.get('/create', (req, res) => {
    res.render('create');
});

router.get('/details/:id', (req, res) => {
    let id = createCubic.findOne(req.params.id);

    res.render('details',{products: id,})

})

router.post('/create', (req, res) => {
    let data = req.body;

    createCubic.create(data);

    res.redirect('/products')
});

module.exports = router;