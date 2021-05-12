const router = require('express').Router();
const userService = require('../services/User');
const User = require('../models/User');
const isGuest = require('../middleware/isGuest');
let bcrypt = require('bcrypt');

router.get('/register', isGuest, (req, res) => {
    res.render('register');
});

router.get('/login', isGuest, (req, res) => {
    res.render('login');
});

router.get('/logout', (req, res) => {
    res.clearCookie('user');
    res.redirect('/auth/login');
});

router.post('/login', async (req, res) => {
    let {username, password} = req.body;

    try {
        let token = await userService.login(username, password);

        res.cookie('user', token);
        res.redirect('/products')
    } catch (error) {
        res.render('login', {error: error})
    }
});

router.post('/register', async (req, res) => {
    let {username, password, repeatPassword} = req.body;
    let hashedPassword = await userService.hashPassword(password);

    try {
        let user = await userService.create(username, hashedPassword);
        res.redirect('/products');
    } catch(err) {
        let error = Object.keys(err.errors).map(x => err.errors[x].properties.message);

        res.render('register', {error})
    }
});

module.exports = router;