const { Router } = require('express')
const router = Router();

const productsController = require('../controllers/productController');
const accessoryController = require('../controllers/AccessoryController');
const AuthController = require('../controllers/AuthController');

router.get('/' ,(req,res) => {
    res.redirect('/products');
});

router.use('/products', productsController);

router.use('/accessory', accessoryController);

router.use('/auth', AuthController)

router.get('/about', (req, res) => {
    res.render('about');
});
router.get('*', (req, res) => {
    res.render('404');
})

module.exports = router;