/* Load Modules */
const express = require('express');
const router = express.Router();

/* Load controller */
const CarController = require('../../controller/carController');
const carController = new CarController();

/**
 * Car Entity Front routes
 */
router.get('/', function (req, res) {
    res.render('./car/index');
});

router.get('/new/', function (req, res) {
    res.render('./car/new');
});

router.get('/show/:id', function (req, res) {
    res.render('./car/show', {id: req.params.id});
});

router.get('/edit/:id', function (req, res) {
    res.render('./car/edit', {id: req.params.id});
});

router.get('/delete/:id', function (req, res) {
    res.render('./car/delete', {id: req.params.id});
});

module.exports = router;