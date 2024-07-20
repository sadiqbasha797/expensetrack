
const express = require('express');
const { verifyToken } = require('../middleware/authJwt');
const expenseController = require('../controllers/expense.controller');

const router = express.Router();

router.post('/', verifyToken, expenseController.createExpense);
router.get('/', verifyToken, expenseController.getExpenses);
router.put('/:expenseId', verifyToken, expenseController.updateExpense);
router.delete('/:expenseId', verifyToken, expenseController.deleteExpense);

module.exports = router;
