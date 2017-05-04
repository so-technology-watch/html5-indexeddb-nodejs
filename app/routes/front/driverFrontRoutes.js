/* Load Modules */
const express = require('express');
const router = express.Router();

/**
 * Driver Entity Front routes
 */
router.get('/', function (req, res) {
    res.render('./driver/index.html');
});

router.get('/new/', function (req, res) {
    res.render('./driver/new.html');
});

router.get('/show/:id', function (req, res) {
    res.render('./driver/show.html');
});

router.get('/edit/:id', function (req, res) {
    res.render('./driver/edit.html');
});

router.get('/delete/:id', function (req, res) {
    res.render('./driver/edit.html');
});
module.exports = router;