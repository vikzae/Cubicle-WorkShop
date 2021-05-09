const router = require('express').Router();
var jwt = require('jsonwebtoken');
const userService = require('../services/User');
const User = require('../models/User');
let bcrypt = require('bcrypt');
const saltRounds = 1;
const secret = 'muchSecret';

router.get('/register' , (req, res) => {
    
    res.render('register');
});

router.get('/login', (req, res) => {
    res.render('login');
});

router.get('/logout', (req, res) => {
    res.clearCookie('user');
    res.redirect('/auth/login')
})

router.post('/login', async (req, res) => {
    let user = await User.findOne({username: req.body.username});
    
    bcrypt.compare(req.body.password,user.password)
        .then(() => {
            var token = jwt.sign({_id: user._id,username: user.username}, secret);
            
            res.cookie('user', token);
            res.redirect('/products');
        })
        .catch(err => console.log(err))
})

router.post('/register', (req, res) => {
    //chack if passwords are indenticle
    let {username, password} = req.body;
    bcrypt.hash(password, saltRounds)
        .then((hashedPassword) => {
            console.log(hashedPassword);
            userService.create(username, hashedPassword);
            res.redirect('/auth/login')
        });
})

module.exports = router;