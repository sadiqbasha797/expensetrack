
const Expense = require('../models/expense.model');

exports.createExpense = async (req, res) => {
  const { date, amount, category, description } = req.body;
  const newExpense = new Expense({
    user: req.userId, 
    date,
    amount,
    category,
    description
  });

  try {
    await newExpense.save();
    res.send({ message: "Expense added successfully!", data: newExpense });
  } catch (error) {
    res.status(500).send({ message: "Error adding expense" });
  }
};

exports.getExpenses = async (req, res) => {
  try {
    const expenses = await Expense.find({ user: req.userId });
    res.status(200).send(expenses);
  } catch (error) {
    res.status(500).send({ message: "Error retrieving expenses" });
  }
};

exports.updateExpense = async (req, res) => {
  const { expenseId } = req.params;
  try {
    const updatedExpense = await Expense.findByIdAndUpdate(expenseId, req.body, { new: true });
    if (!updatedExpense) {
      return res.status(404).send({ message: "Expense not found" });
    }
    res.send({ message: "Expense updated successfully", data: updatedExpense });
  } catch (error) {
    res.status(500).send({ message: "Error updating expense" });
  }
};

exports.deleteExpense = async (req, res) => {
    const { expenseId } = req.params;
    console.log("Trying to delete expense with ID:", expenseId);
    try {
      const deletedExpense = await Expense.findByIdAndDelete(expenseId);
      console.log("Deleted Expense:", deletedExpense);
      if (!deletedExpense) {
        console.log("No expense found with ID:", expenseId);
        return res.status(404).send({ message: "Expense not found" });
      }
      res.send({ message: "Expense deleted successfully" });
    } catch (error) {
      console.error("Error encountered:", error);
      res.status(500).send({ message: "Error deleting expense" });
    }
  };
  
