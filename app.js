'use strict';

const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const path = require('path');

const app = express()
const uristring = process.env.MONGODB_URI || 'mongodb://localhost/ExpertSystem';

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(__dirname + '/assets'))


mongoose.connect(uristring, (err, res) => {
    if (err) {
        console.log('ERROR connecting to: ' + uristring + '. ' + err);
    } else {
        console.log('Succeeded connected to: ' + uristring);
    }
});

const options = {
    host: 'localhost',
    port: 8080
}

// Create a server with a host and port
app.listen(options.port, () => console.log(`Example app listening on port ${options.port}!`))


// request is made to the homepage
app.get('/', function (req, res) {
    res.sendFile(__dirname + '/views/index.html')
})

// request is made to the systempage
app.get('/system', function (req, res) {
    res.sendFile(__dirname + '/views/system.html')
})