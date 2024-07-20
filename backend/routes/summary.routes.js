
const express = require('express');
const { verifyToken } = require('../middleware/authJwt');
const summaryController = require('../controllers/summary.controller');

const router = express.Router();

router.get('/total', verifyToken, summaryController.getTotalSpending);
router.get('/by-category', verifyToken, summaryController.getExpensesByCategory); // Route for category summary
router.get('/expenses/day', verifyToken, summaryController.getExpensesForDay);
router.get('/expenses/month', verifyToken, summaryController.getExpensesForMonth);

module.exports = router;
