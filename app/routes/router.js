/**
 * Express Router configuration
 */
const express = require('express');
const router = express.Router();

/* API Routes */
router.use('/api/car', require('./api/carRoutes'));
router.use('/api/driver', require('./api/driverRoutes'));

/* Client Web interface Routes */
router.use('/', require('./client/client'));

module.exports = router;