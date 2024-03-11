// routes/index.js

const express = require('express');
const router = express.Router();

// Import other route files
const apiRoutes = require('./apiRoutes');
const htmlRoutes = require('./htmlRoutes');

// Use API routes
router.use('/api', apiRoutes);

// Use HTML routes
router.use('/', htmlRoutes);

// Export the router
module.exports = router;
