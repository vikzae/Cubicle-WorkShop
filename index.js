const env = process.env.NODE_ENV || 'development';


const config = require('./config/config')[env];
const express = require('express');
const app = express();
const handlebars = require('express-handlebars');
const routes = require('./config/routes');
require('./config/express')(app);

app.use(routes)

app.listen(config.port, console.log(`Listening on port ${config.port}! Now its up to you...`));