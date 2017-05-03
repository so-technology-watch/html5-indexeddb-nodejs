/* Load Modules */
const express = require('express');
const router = express.Router();

/**
 * Car Entity Front routes
 */
router.get('/', function (req, res) {
    res.render('./car/index.html');
});

router.get('/new/:id', function (req, res) {
    res.render('./car/new.html');
});

router.get('/show/:id', function (req, res) {
    res.render('./car/show.html');
});

router.get('/edit/:id', function (req, res) {
    res.render('./car/edit.html');
});

router.get('/delete/:id', function (req, res) {
    res.render('./car/edit.html');
});


module.exports = router;