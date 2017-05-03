/* Load Modules */
const express = require('express');
const router = express.Router();

/**
 * Client main Front routes
 */
router.get('/', function (req, res) {
    res.render('index.html');
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