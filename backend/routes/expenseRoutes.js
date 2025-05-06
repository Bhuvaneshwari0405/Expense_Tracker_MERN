const express = require('express');
const {addExpense, getAllExpense, deleteExpense, downloadExpenseExcel} = require('../controllers/ExpenseController');
const {protect} = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/add', protect, addExpense); // Add Expense
router.get('/get', protect, getAllExpense); // Get all Expense
router.delete('/:id', protect, deleteExpense); // Delete Expense by ID
router.get('/downloadexcel', protect, downloadExpenseExcel); // Download Expense as Excel

module.exports = router;