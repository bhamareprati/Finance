

import mongoose from "mongoose";

const ExpenseSchema = new mongoose.Schema({
    title: { 
        type: String, 
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
    type: { 
        type: String, 
        enum: ["income", "expense"], 
        required: true 
    },
    date: { 
        type: Date, 
        required: true 
    },
    description: { 
        type: String 
    },
}, { timestamps: true });

const Expense = mongoose.model("Expense", ExpenseSchema);
export default Expense;










