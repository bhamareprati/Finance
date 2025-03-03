/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaEdit, FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "./style.css";

const TableView = ({ filters }) => {
  const navigate = useNavigate();

  // Default entries if API doesn't return data
  const defaultEntries = [
    { _id: "1", date: "2025-02-01", title: "Salary", amount: 5000, type: "Income", category: "Income" },
    { _id: "2", date: "2025-02-05", title: "Groceries", amount: 150, type: "Expense", category: "Food" },
    { _id: "3", date: "2025-02-10", title: "Transport", amount: 50, type: "Expense", category: "Transport" },
    { _id: "4", date: "2025-02-12", title: "Freelance", amount: 1200, type: "Income", category: "Income" },
    { _id: "5", date: "2025-02-15", title: "Movie", amount: 100, type: "Expense", category: "Entertainment" }
  ];
  
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    fetchExpenses();
  }, [filters]);

  const fetchExpenses = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/expenses", { params: filters });
      setExpenses(response.data.length > 0 ? response.data : defaultEntries); // Use API data or default entries
    } catch (error) {
      console.error("Error fetching expenses:", error);
      setExpenses(defaultEntries); // Fallback to default entries on error
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/expenses/${id}`);
      fetchExpenses();
    } catch (error) {
      console.error("Error deleting expense:", error);
    }
  };

  return (
    <table className="table table-striped table-bordered">
      <thead className="table-dark">
        <tr>
          <th>Date</th>
          <th>Title</th>
          <th>Amount</th>
          <th>Type</th>
          <th>Category</th>
    
        </tr>
      </thead>
      <tbody>
        {expenses.map((expense) => (
          <tr key={expense._id}>
            <td>{new Date(expense.date).toLocaleDateString()}</td>
            <td>{expense.title}</td>
            <td>Rs.{expense.amount}</td>
            <td>{expense.type}</td>
            <td>{expense.category}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TableView;
