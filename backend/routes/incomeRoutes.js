const express = require('express');
const {addIncome, getAllIncome, deleteIncome, downloadIncomeExcel} = require('../controllers/incomeController');
const {protect} = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/add', protect, addIncome); // Add income
router.get('/get', protect, getAllIncome); // Get all income
router.delete('/:id', protect, deleteIncome); // Delete income by ID
router.get('/downloadexcel', protect, downloadIncomeExcel); // Download income as Excel

module.exports = router;