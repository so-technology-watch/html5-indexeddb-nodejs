/* Load Modules */
const express = require('express');
const router = express.Router();

/* Load controller */
const DriverController = require('../../controller/driverController');
const driverController = new DriverController();

/**
 * Driver Entity Front routes
 */
router.get('/', function (req, res) {
    res.render('./driver/index');
});

router.get('/new/', function (req, res) {
    res.render('./driver/new');
});

router.get('/show/:id', function (req, res) {
    res.render('./driver/show', {id: req.params.id});
});

router.get('/edit/:id', function (req, res) {
    res.render('./driver/edit', {id: req.params.id});
});

router.get('/delete/:id', function (req, res) {
    driverController.deleteById(req, res);
    res.redirect('../../driver');
});
module.exports = router;