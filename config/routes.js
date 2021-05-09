const { Router } = require('express')
const router = Router();

const productsController = require('../controllers/productController');
const accessoryController = require('../controllers/AccessoryController');
const AuthController = require('../controllers/AuthController');
const auth = require('../middleware/auth');

router.get('/' ,(req,res) => {
    res.redirect('/products');
});

router.use('/products', productsController);

router.use('/accessory', accessoryController);

router.use('/auth', AuthController)

router.get('/about',auth, (req, res) => {
    res.render('about',{user: req.user});
});
router.get('*', (req, res) => {
    res.render('404');
})

module.exports = router;