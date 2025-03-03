

import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { addExpense } from "../services/api"; // Ensure this function exists in api.js

const AddExpenseModal = ({ show, handleClose }) => {
  const [expense, setExpense] = useState({
    title: "",
    amount: "",
    category: "",
    type: "expense", // ✅ Default to lowercase to match schema
    date: "",
    description: "",
  });

  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setExpense({ ...expense, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formattedExpense = {
        ...expense,
        amount: parseFloat(expense.amount), // ✅ Ensure amount is a number
        type: expense.type.toLowerCase(), // ✅ Convert type to lowercase
      };
      const data = await addExpense(formattedExpense);
      console.log("Expense Added:", data);
      alert("Transaction Added Successfully!");
      setExpense({ title: "", amount: "", category: "", type: "expense", date: "", description: "" }); // ✅ Reset form
      handleClose();
    } catch (err) {
      setError(err.error || "Failed to add expense");
    }
  };

  return (
    <>
      {error && <p className="text-danger">{error}</p>}
      {show && <div className="modal-backdrop fade show"></div>}
      <div className={`modal ${show ? "d-block" : "d-none"}`} tabIndex="-1">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title fw-bold">Add New Expense</h5>
              <button type="button" className="btn-close" onClick={handleClose}></button>
            </div>
            <div className="modal-body fw-bold">
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label">Title</label>
                  <input type="text" name="title" className="form-control" value={expense.title} onChange={handleChange} required />
                </div>

                <div className="mb-3">
                  <label className="form-label">Amount</label>
                  <input type="number" name="amount" className="form-control" value={expense.amount} onChange={handleChange} required />
                </div>

                <div className="mb-3">
                  <label className="form-label">Category</label>
                  <select name="category" className="form-select" value={expense.category} onChange={handleChange} required>
                    <option value="">Select Category</option>
                    <option>Food</option>
                    <option>Transport</option>
                    <option>Entertainment</option>
                    <option>Health</option>
                    <option>Other</option>
                  </select>
                </div>

                <div className="mb-3">
                  <label className="form-label">Type</label>
                  <select name="type" className="form-select" value={expense.type} onChange={handleChange}>
                    <option value="income">Income</option>
                    <option value="expense">Expense</option>
                  </select>
                </div>

                <div className="mb-3">
                  <label className="form-label">Date</label>
                  <input type="date" name="date" className="form-control" value={expense.date} onChange={handleChange} required />
                </div>

                <div className="mb-3">
                  <label className="form-label">Description</label>
                  <textarea name="description" className="form-control" rows="3" value={expense.description} onChange={handleChange}></textarea>
                </div>

                <div className="d-flex justify-content-between">
                  <button type="submit" className="btn btn-success">Add Expense</button>
                  <button type="button" className="btn btn-secondary" onClick={handleClose}>Close</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddExpenseModal;
