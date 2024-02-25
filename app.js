const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('./mongooseConnection');
const routes = require('./routes');

const whitelist = ['http://localhost:4000'];

function originFunction(origin, callback) {
    if (whitelist.includes(origin) || !origin) {
        callback(null, true);
    }
    else {
        callback(new Error('Not allowed by CORS'));
    }
}
const corsOptions = {
    origin:originFunction,
}

const app = express();
app.use(cors(corsOptions));
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.set('views', 'views');

mongoose.set('strictQuery', false);

const port = 4000;

app.use('/', routes.expenseRoutes);

app.listen(port, () => {
    
})