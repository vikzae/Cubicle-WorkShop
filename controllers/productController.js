const { Router } = require('express');
const createCubic = require('../services/createCubic.js');

const router = Router();

router.get('/',(req, res) => {
    let products = createCubic.getAll(req.query)
     res.render('index',{products});
});

router.get('/create', (req, res) => {
    res.render('create');
});

router.get('/details/:id', (req, res) => {
    let id = createCubic.findOne(req.params.id);

    res.render('details',{products: id,})

});

router.post('/create', (req, res) => {
    let data = req.body;

    createCubic.create(data)
        .then(() => res.redirect('/products'))

    
});

module.exports = router;