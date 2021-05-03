const express = require('express');
const handlebars = require('express-handlebars');
const bodyParser = require('body-parser');

module.exports = (app) => {
    
    app.engine('hbs', handlebars({
        extname:'hbs'
    }));
    //TODO: Setup the view engine
    app.set('view engine','hbs')
    //TODO: Setup the body parser
    app.use(express.urlencoded({
        extended: true,
    }))
    //TODO: Setup the static files
    app.use(express.static('static'))
};