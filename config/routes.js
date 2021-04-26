const { Router } = require('express');

const productController = require('../controllers/productController');
const aboutController = require('../controllers/aboutController');

const router = Router();

router.get('/', (req, res) => {
    res.redirect('/products')
});

router.use('/products',productController);
router.use('/about', aboutController);
router.get('*', (req, res) => {
    res.render('404')
})

module.exports = router;