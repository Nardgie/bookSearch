const mongoose = require('mongoose');

//google books database 
mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/gbooks-db');

module.exports = mongoose.connection;
