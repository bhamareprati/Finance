/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import "./style.css";

const AddExpenseModal = ({ show, handleClose }) => {

  const defaultEntries = [
    { title: "Salary", amount: 5000, category: "Income", type: "Income", date: "2025-02-01", description: "Monthly salary" },
    { title: "Groceries", amount: 150, category: "Food", type: "Expense", date: "2025-02-05", description: "Weekly groceries" },
    { title: "Transport", amount: 50, category: "Transport", type: "Expense", date: "2025-02-10", description: "Bus fare" },
    { title: "Freelance", amount: 1200, category: "Income", type: "Income", date: "2025-02-12", description: "Freelance project payment" },
    { title: "Movie", amount: 100, category: "Entertainment", type: "Expense", date: "2025-02-15", description: "Cinema ticket" }
  ];
  
  const [expense, setExpense] = useState({
    title: "",
    amount: "",
    category: "",
    type: "Expense",
    date: "",
    description: "",
  });

  const handleChange = (e) => {
    setExpense({ ...expense, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Expense Added:", expense);
    handleClose(); 
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Add New Expense</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Title</Form.Label>
            <Form.Control type="text" name="title" value={expense.title} onChange={handleChange} required />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Amount</Form.Label>
            <Form.Control type="number" name="amount" value={expense.amount} onChange={handleChange} required />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Category</Form.Label>
            <Form.Select name="category" value={expense.category} onChange={handleChange} required>
              <option value="">Select Category</option>
              <option>Food</option>
              <option>Transport</option>
              <option>Entertainment</option>
              <option>Health</option>
              <option>Other</option>
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Type</Form.Label>
            <Form.Select name="type" value={expense.type} onChange={handleChange}>
              <option>Income</option>
              <option>Expense</option>
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Date</Form.Label>
            <Form.Control type="date" name="date" value={expense.date} onChange={handleChange} required />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Description</Form.Label>
            <Form.Control as="textarea" name="description" rows={3} value={expense.description} onChange={handleChange} />
          </Form.Group>

          <Button variant="success" type="submit">
            Add Expense
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default AddExpenseModal;
