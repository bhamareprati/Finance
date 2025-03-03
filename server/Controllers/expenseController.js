
import Expense from "../models/expenseSchema.js";

// Add Expense
export const addExpense = async (req, res) => {
  try {
      const { title, amount, category, type, date, description } = req.body;

      if (!title || !amount || !category || !type || !date) {
          return res.status(400).json({ error: "All fields are required" });
      }

      const newExpense = new Expense({
          title,
          amount: parseFloat(amount),  // Ensure amount is stored as Number
          category,
          type,
          date: new Date(date),  // Ensure date is stored as Date
          description
      });

      await newExpense.save();
      res.status(201).json({ message: "Expense Added Successfully", expense: newExpense });

  } catch (error) {
      res.status(500).json({ error: error.message });
  }
};

// Get Expenses
export const getExpenses = async (req, res) => {
    try {
        const expenses = await Expense.find();
        return res.status(200).json(expenses);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

export const deleteExpense = async (req, res) => {
    try {
      const deletedExpense = await Expense.findByIdAndDelete(req.params.id);
      if (!deletedExpense) {
        return res.status(404).json({ success: false, message: "Expense not found" });
      }
      res.json({ success: true, message: "Expense deleted!" });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  };


  export const getSummary = async (req, res) => {
    try {
      const { frequency, type } = req.query;
      
      let filter = {};
      if (type !== "All") filter.type = type;
  
      if (frequency === "Last Week") {
        const lastWeek = new Date();
        lastWeek.setDate(lastWeek.getDate() - 7);
        filter.date = { $gte: lastWeek };
      }
  
      const totalIncome = await Expense.aggregate([
        { $match: { ...filter, type: "Income" } },
        { $group: { _id: null, total: { $sum: "$amount" } } }
      ]);
  
      const totalExpense = await Expense.aggregate([
        { $match: { ...filter, type: "Expense" } },
        { $group: { _id: null, total: { $sum: "$amount" } } }
      ]);
  
      res.json({
        totalIncome: totalIncome.length ? totalIncome[0].total : 0,
        totalExpense: totalExpense.length ? totalExpense[0].total : 0,
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  
   
