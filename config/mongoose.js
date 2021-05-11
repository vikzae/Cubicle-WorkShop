const mongoose = require('mongoose');

module.exports = (app) => {

    mongoose.connect('mongodb://localhost/CubeShop', {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false});

    const db = mongoose.connection;

    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', function() {
    console.log('db connected');
    });
    mongoose.set('useNewUrlParser', true);
    mongoose.set('useFindAndModify', false);
    mongoose.set('useCreateIndex', true);
}