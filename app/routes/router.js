/**
 * Express Router configuration
 */
const express = require('express');
const router = express.Router();

/* API routes */
router.use('/api/car', require('./api/carRoutes'));
router.use('/api/driver', require('./api/driverRoutes'));

/* Entities Front routes */
router.use('/car', require('./front/carFrontRoutes'));
router.use('/driver', require('./front/driverFrontRoutes'));

/* Client main Front routes */
router.use('/', require('./front/client'));

module.exports = router;