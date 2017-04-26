/**
 * Driver Entity routes
 */

/* Load Modules */

const express = require('express');
const router = express.Router();

/* Load controller */

const DriverController = require('../Controller/DriverController');

router.get('/:uid', function (req, res) {
    CarController.findById(req, res)
});

router.get('/', function (req, res) {
    DriverController.findAll(req, res)
});

router.put('/', function (req, res) {
    DriverController.update(req, res)
});

router.post('/create', function (req, res) {
    DriverController.create(req, res);
});

router.delete('/:uid', function (req, res) {
    DriverController.deleteById(req, res)
});

module.exports = router;