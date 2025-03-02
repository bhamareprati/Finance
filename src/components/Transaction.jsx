import React, { useState, useEffect } from "react";
import axios from "axios";
import { Navbar, Nav, Container, Button, Table, ButtonGroup } from "react-bootstrap";
import { FaEdit, FaTrash, FaSignOutAlt } from "react-icons/fa";
import { HouseDoor, ListCheck, BarChart } from "react-bootstrap-icons"; // ✅ Imported missing icons
import { useNavigate } from "react-router-dom";
import { getExpenses, deleteExpense } from "../services/api";

const Transactions = () => {
  const navigate = useNavigate();

  // Default transaction data (if API fails)
  const defaultTransactions = [
    { _id: "1", date: "2025-02-01", title: "Salary", amount: 5000, type: "Income", category: "Income" },
    { _id: "2", date: "2025-02-05", title: "Groceries", amount: 150, type: "Expense", category: "Food" },
    { _id: "3", date: "2025-02-10", title: "Transport", amount: 50, type: "Expense", category: "Transport" },
    { _id: "4", date: "2025-02-12", title: "Freelance", amount: 1200, type: "Income", category: "Income" },
    { _id: "5", date: "2025-02-15", title: "Movie", amount: 100, type: "Expense", category: "Entertainment" }
  ];

  const [transactions, setTransactions] = useState([]);
  const [filteredTransactions, setFilteredTransactions] = useState([]);
  const [filterType, setFilterType] = useState("All"); // Default: Show all transactions

  // Fetch transactions when component mounts
  useEffect(() => {
    fetchTransactions();
  }, []);

  // Fetch data from API
  const fetchTransactions = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/expenses");
      console.log("Fetched transactions:", response.data);
      const data = response.data.length > 0 ? response.data : defaultTransactions;
  
      setTransactions(data);  // ✅ Always store full data
      setFilteredTransactions(data);  // ✅ Ensure filteredTransactions starts with all data
    } catch (error) {
      console.error("Error fetching transactions:", error);
      setTransactions(defaultTransactions);
      setFilteredTransactions(defaultTransactions);
    }
  };
  

  // Filter transactions by type (All, Income, Expense)
  const handleFilterChange = (type) => {
    setFilterType(type);
    
    if (type === "All") {
      setFilteredTransactions(transactions);
    } else {
      setFilteredTransactions(transactions.filter((t) => t.type.toLowerCase() === type.toLowerCase()));
    }
  };
  

  // Delete a transaction
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/expenses/${id}`);
      fetchTransactions();  // Refresh transactions after delete
    } catch (error) {
      console.error("Failed to delete transaction:", error);
    }
  };
  
  // Logout function (dummy for now)
  const handleLogout = () => {
    console.log("Logging out...");
    // Add logout logic here (e.g., clearing session)
  };

  return (
    <>
      {/* Navbar */}
      <Navbar expand="lg" className="bg-light shadow p-3">
        <Container>
          <Navbar.Brand className="fw-bold text-black">Personal Finance Manager</Navbar.Brand>
          <Navbar.Toggle aria-controls="navbar-nav" />
          <Navbar.Collapse id="navbar-nav" className="justify-content-end">
            <Nav className="custom-nav"> 
              <Nav.Link onClick={() => navigate("/home")}><HouseDoor className="me-2" />Home</Nav.Link>
              <Nav.Link onClick={() => navigate("/Transaction")}><ListCheck className="me-2" /> Transactions</Nav.Link>
              <Nav.Link onClick={() => navigate("/reports")}><BarChart className="me-2" /> Reports</Nav.Link>
            </Nav>
            <Button variant="danger" className="ms-3 d-flex align-items-center" onClick={handleLogout}>
              <FaSignOutAlt className="me-2" /> Logout
            </Button>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <p class="finance-quote">"Money grows when you manage it well."</p>

      {/* Transactions Section */}
      <Container className="mt-4">
        <h2 className="text-center mb-3">Transactions</h2>

        {/* Filter Buttons */}
        <ButtonGroup className="d-flex justify-content-center mb-3">
          <Button variant={filterType === "All" ? "primary" : "light"} onClick={() => handleFilterChange("All")}>
            All
          </Button>
          <Button variant={filterType === "Income" ? "success" : "light"} onClick={() => handleFilterChange("Income")}>
            Income
          </Button>
          <Button variant={filterType === "Expense" ? "danger" : "light"} onClick={() => handleFilterChange("Expense")}>
            Expense
          </Button>
        </ButtonGroup>

        {/* Transactions Table */}
        <Table striped bordered hover responsive>
          <thead className="table-dark">
            <tr>
              <th>Date</th>
              <th>Title</th>
              <th>Amount ($)</th>
              <th>Type</th>
              <th>Category</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredTransactions.length > 0 ? (
              filteredTransactions.map((transaction) => (
                <tr key={transaction._id}>
                  <td>{new Date(transaction.date).toLocaleDateString()}</td>
                  <td>{transaction.title}</td>
                  <td>${transaction.amount}</td>
                  <td className={transaction.type === "Income" ? "text-success" : "text-danger"}>
                    {transaction.type}
                  </td>
                  <td>{transaction.category}</td>
                  <td>
                    <Button className="btn btn-warning btn-sm mx-1" onClick={() => navigate(`/edit-expense/${transaction._id}`)}>
                      <FaEdit />
                    </Button>
                    <Button className="btn btn-danger btn-sm" onClick={() => handleDelete(transaction._id)}>
                      <FaTrash />
                    </Button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center">
                  No transactions found.
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      </Container>
    </>
  );
};

export default Transactions;
