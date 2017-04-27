/* Load Modules */
const express = require('express');
const router = express.Router();

/* Load controller */
const DriverController = require('../controller/DriverController');
const driverController = new DriverController();

/**
 * Driver Entity routes
 */
router.get('/count', function (req, res) {
    driverController.countAll(req, res);
});

router.get('/exists/:id', function (req, res) {
    driverController.exists(req, res);
});

router.get('/:id', function (req, res) {
    driverController.findById(req, res)
});

router.get('/', function (req, res) {
    driverController.findAll(req, res)
});

router.put('/', function (req, res) {
    driverController.update(req, res)
});

router.post('/create', function (req, res) {
    driverController.create(req, res);
});

router.delete('/:id', function (req, res) {
    driverController.deleteById(req, res)
});

module.exports = router;