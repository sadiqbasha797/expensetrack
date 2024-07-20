const Expense = require('../models/expense.model');
const mongoose = require('mongoose');

const monthNames = ["January", "February", "March", "April", "May", "June",
                    "July", "August", "September", "October", "November", "December"];

exports.getTotalSpending = async (req, res) => {
    const userId = new mongoose.Types.ObjectId(req.userId);

    try {
        const dailyTotal = await Expense.aggregate([
            { $match: { user: userId } },
            { $group: {
                _id: {
                    year: { $year: "$date" },
                    month: { $month: "$date" },
                    day: { $dayOfMonth: "$date" }
                },
                total: { $sum: "$amount" }
            }},
            { $sort: { "_id.year": 1, "_id.month": 1, "_id.day": 1 } }
        ]);

        const weeklyTotal = await Expense.aggregate([
            { $match: { user: userId } },
            { $group: {
                _id: {
                    year: { $year: "$date" },
                    week: { $week: "$date" }
                },
                total: { $sum: "$amount" }
            }},
            { $sort: { "_id.year": 1, "_id.week": 1 } }
        ]);

        const monthlyTotal = await Expense.aggregate([
            { $match: { user: userId } },
            { $group: {
                _id: {
                    year: { $year: "$date" },
                    month: { $month: "$date" }
                },
                total: { $sum: "$amount" }
            }},
            { $addFields: {
                "monthName": { $arrayElemAt: [monthNames, { $subtract: ["$_id.month", 1] }] }
            }},
            { $sort: { "_id.year": 1, "_id.month": 1 } }
        ]);

        res.send({
            dailyTotals: dailyTotal,
            weeklyTotals: weeklyTotal,
            monthlyTotals: monthlyTotal.map(month => ({
                year: month._id.year,
                month: month._id.month,
                monthName: month.monthName,
                total: month.total
            }))
        });
    } catch (error) {
        console.error("Error calculating total spending:", error);
        res.status(500).send({ message: "Error calculating total spending" });
    }
};

exports.getExpensesByCategory = async (req, res) => {
    const userId = new mongoose.Types.ObjectId(req.userId);

    try {
        const categoriesSummary = await Expense.aggregate([
            { $match: { user: userId } },
            { $group: {
                _id: "$category",
                totalAmount: { $sum: "$amount" }
            }},
            { $sort: { totalAmount: -1 } }
        ]);

        res.send(categoriesSummary);
    } catch (error) {
        console.error("Error getting expenses by category:", error);
        res.status(500).send({ message: "Error calculating expenses by category" });
    }
};

exports.getExpensesForDay = async (req, res) => {
    const { date } = req.query; // Expecting 'YYYY-MM-DD' format
    const userId = new mongoose.Types.ObjectId(req.userId);

    try {
        const expensesForDay = await Expense.find({
            user: userId,
            date: {
                $gte: new Date(`${date}T00:00:00.000Z`),
                $lt: new Date(`${date}T23:59:59.999Z`)
            }
        }).sort({ date: 1 });

        res.json(expensesForDay);
    } catch (error) {
        console.error("Error fetching expenses for day:", error);
        res.status(500).send({ message: "Error fetching expenses for the specified day" });
    }
};

exports.getExpensesForMonth = async (req, res) => {
    const { year, month } = req.query; // Expecting year and month (1-12)
    const userId = new mongoose.Types.ObjectId(req.userId);
    const startDate = new Date(Date.UTC(year, month - 1, 1)); // Month is 0-indexed in JavaScript
    const endDate = new Date(Date.UTC(year, month, 0, 23, 59, 59, 999));

    try {
        const expensesForMonth = await Expense.find({
            user: userId,
            date: { $gte: startDate, $lte: endDate }
        }).sort({ date: 1 });

        const total = expensesForMonth.reduce((acc, cur) => acc + cur.amount, 0);

        res.json({
            expenses: expensesForMonth,
            total: total
        });
    } catch (error) {
        console.error("Error fetching expenses for month:", error);
        res.status(500).send({ message: "Error fetching expenses for the specified month" });
    }
};
