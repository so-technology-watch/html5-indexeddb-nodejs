/**
 * Express Router configuration
 */

const express = require('express');
const router = express.Router();

/* API Routes */

router.use('/api/car', require('./CarRoutes'));
router.use('/api/driver', require('./DriverRoutes'));

/* Client Web interface Routes */

router.get('/', function (req, res) {
    res.render('index.html');
});

router.get('/car', function (req, res) {
    res.render('car.html');
});

router.get('/driver', function (req, res) {
    res.render('driver.html');
});

router.get('/ping', function (req, res) {
    let fullUrl = req.protocol + '://' + req.get('host');
    res.status(200);
    res.json({
        "alive": "yes",
        "url": fullUrl
    });
});

module.exports = router;