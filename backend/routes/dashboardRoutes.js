const express = require('express');
const {protect} = require('../middleware/authMiddleware');
const {getDashboardData} = require('../controllers/dashboardController');
const router = express.Router();

router.get('/', protect, getDashboardData); // Get dashboard data

module.exports = router;