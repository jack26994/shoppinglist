// Importing Modules
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var cors = require('cors');
var app = express();

const port = 3000;
const route = require('./route/routes');

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/shoppinglist');

// On connection
mongoose.connection.on('connected', (err) => {
    if (err){
        console.log(err);
        return;
    }
    console.log('MongoDB connected at port 27017');
});

// Adding Middleware - Cors
app.use(cors());

// Body-parser
app.use(bodyParser.json());

app.use('/api', route);

app.get('/', (req, res) => {
    res.send('foobar');
});

app.listen(port, (err) => {
    if (err){
        console.log(err);
        return;
    }
    console.log('Server has started at port ' + port);
});
