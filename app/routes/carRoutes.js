/* Load Modules */
const express = require('express');
const router = express.Router();

/* Load controller */
const CarController = require('../controller/CarController');
const carController = new CarController();

/**
 * Car Entity routes
 */
router.get('/count', function (req, res) {
    carController.countAll(req, res);
});

router.get('/exists/:id', function (req, res) {
    carController.exists(req, res);
});

router.get('/:id', function (req, res) {
    carController.findById(req, res)
});

router.get('/', function (req, res) {
    carController.findAll(req, res)
});

router.put('/', function (req, res) {
    carController.update(req, res)
});

router.post('/create', function (req, res) {
    carController.create(req, res);
});

router.delete('/:id', function (req, res) {
    carController.deleteById(req, res)
});

module.exports = router;