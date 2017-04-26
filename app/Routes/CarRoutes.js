/**
 * Car Entity routes
 */

/* Load Modules */

const express = require('express');
const router = express.Router();

/* Load controller */

const CarController = require('../Controller/CarController');

router.get('/:uid', function (req, res) {
    CarController.findById(req, res)
});

router.get('/', function (req, res) {
    CarController.findAll(req, res)
});

router.put('/', function (req, res) {
    CarController.update(req, res)
});

router.post('/create', function (req, res) {
    CarController.create(req, res);
});

router.delete('/:uid', function (req, res) {
    CarController.deleteById(req, res)
});

module.exports = router;