const {generateKeys} = require('./util/encryption');
const {config} = require('../src/config');
var mongoose = require('mongoose');


const TestMongoConnection =()=>{
    mongoose.connect(config.db.mongo.host, {useNewUrlParser: true});
    var db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', function() {
    // we're connected!
    console.log("Conecftion successfully!!!")
    });
}

module.exports =()=>{
    TestMongoConnection();
    generateKeys();
}
