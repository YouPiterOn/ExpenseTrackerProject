const mongoose = require('mongoose');

let dbString = 'mongodb+srv://user-1:oj3f2MtVee648RpA@cluster0.vujzeeu.mongodb.net/?retryWrites=true&w=majority';

mongoose.connect(dbString);

const dbConnection = mongoose.connection;

dbConnection.on('error', () => console.error('MongoDB connection error:'));

dbConnection.once('open', () => console.log('Connected to MongoDB'));

module.exports = mongoose;