
const mongoose = require('mongoose');

const ExpenseSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    date: {
        type: Date,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: false
    }
});

const Expense = mongoose.model('Expense', ExpenseSchema);

module.exports = Expense;
