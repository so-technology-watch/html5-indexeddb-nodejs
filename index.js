// Load modules
const express = require("express");
const app = express();
const bodyParser = require("body-parser");

// Database configuration
const database = require('./app/config/dbconfig');

// Init database
database.init();

// Init server listening
const port = process.argv[2] || 3000;
app.listen(port, function () {
    console.log("Server listening on port : " + port);
});

// Authorize external access
const allowCrossDomain = function (req, res, next) {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
};

// Express configuration
app.set('views', __dirname + '/view');
app.use(express.static(__dirname + '/public'));

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// Rendering configuration
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

// Router configuration
app.use(allowCrossDomain);
app.use(require('./app/routes/Router'));