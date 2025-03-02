import express from 'express';
import { addExpense, getExpenses, deleteExpense ,getSummary} from '../Controllers/expenseController.js';

const router = express.Router();

router.post("/add", addExpense);
router.get("/", getExpenses);
router.delete("/:id", deleteExpense);
router.get("/summary", getSummary);

export default router;

