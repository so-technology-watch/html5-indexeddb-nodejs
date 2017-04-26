/*
 * Server Application
 */

/* Load modules */

const express = require("express");
const app = express();
const bodyParser = require("body-parser");

/* Load database & database configuration */

const database = require('./app/Config/dbconfig');

/* Init database */

database.init();

/* Init server listening */

const port = process.argv[2] || 3000;
app.listen(port, function () {
    console.log("Server listening on port : " + port);
});

/* Express configuration */

app.set('views', __dirname + '/View');
app.use(express.static(__dirname + '/public'));

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

/* Rendering configuration */

app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

/* Router configuration */

app.use(require('./app/Routes/Router'));