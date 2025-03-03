/* eslint-disable no-unused-vars */



import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { Navbar, Nav, Container, Button } from "react-bootstrap";
import { FaTable, FaChartBar, FaPlus, FaSignOutAlt } from "react-icons/fa";
import { HouseDoor, ListCheck, BarChart, Wallet2, Tag } from "react-bootstrap-icons";
import "./style.css";
import TableView from "./TableView";
import GraphView from "./GraphView";
import AddExpenseModal from "./AddExpenseModal";


// import "./home.css"

const Home = () => {
  const navigate = useNavigate();
  const [viewMode, setViewMode] = useState("graph");
  const [filters, setFilters] = useState({ frequency: "Last Week", type: "All" });
  const [showModal, setShowModal] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="container-fluid bg-white min-vh-100"
    style={{
      background: "linear-gradient(to left, #ffcc00, #4caf50)",
      padding: "20px",
      borderRadius: "8px"
    }}>

      {/* Navbar */}
      <Navbar expand="lg" className="bg-light shadow p-3">
      <Container>
        <Navbar.Brand className="fw-bold text-black">Personal Finance Manager</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbar-nav" />
        <Navbar.Collapse id="navbar-nav" className="justify-content-end">
          <Nav className="custom-nav"> 
            <Nav.Link onClick={() => navigate("/home")}><HouseDoor className="me-2"/> Home</Nav.Link>
             <Nav.Link onClick={() => navigate("/Transaction")}><ListCheck className="me-2"/> Transactions</Nav.Link>
            <Nav.Link onClick={() => navigate("/reports")}><BarChart className="me-2"/> Reports</Nav.Link>
            {/*<Nav.Link onClick={() => navigate("/budgets")}><Wallet2 className="me-2"/> Budgets</Nav.Link>
            <Nav.Link onClick={() => navigate("/categories")}><Tag className="me-2"/> Categories</Nav.Link> */}
          </Nav>
          <Button variant="danger" className="ms-3 d-flex align-items-center" onClick={handleLogout}>
            <FaSignOutAlt className="me-2" /> Logout
          </Button>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    <p class="finance-quote">"Money grows when you manage it well."</p>
    
<div 
  className="d-flex justify-content-center align-items-center flex-wrap mt-4 gap-3"
  
>


        <div>
          <label className="text-dark fw-bold">Select Frequency</label>
          <select
            className="form-select"
            value={filters.frequency}
            onChange={(e) => setFilters({ ...filters, frequency: e.target.value })}
          >
            <option>Last Week</option>
            <option>Last Month</option>
            <option>Last Year</option>
          </select>
        </div>
        <div>
          <label className="text-dark fw-bold">Type</label>
          <select
            className="form-select"
            value={filters.type}
            onChange={(e) => setFilters({ ...filters, type: e.target.value })}
          >
            <option>All</option>
            <option>Income</option>
            <option>Expense</option>
          </select>
        </div>
        <button className="btn btn-secondary mt-4" onClick={() => setFilters({ frequency: "Last Week", type: "All" })}>
          Reset Filter
        </button>
        <button
          className={`btn ${viewMode === "graph" ? "btn-primary" : "btn-light"} mt-4`}
          onClick={() => setViewMode("graph")}
        >
          <FaChartBar size={20} />
        </button>
        <button
          className={`btn ${viewMode === "table" ? "btn-primary" : "btn-light"} mt-4`}
          onClick={() => setViewMode("table")}
        >
          <FaTable size={20} />
        </button>
        
      </div>

      {/* Add New Expense */}
      <div className="d-flex justify-content-end p-3">
        <Button variant="success" onClick={() => setShowModal(true)}>
          <FaPlus /> Add New
        </Button>
      </div>

      {/* Add Expense Modal */}
      <AddExpenseModal show={showModal} handleClose={() => setShowModal(false)} />

      {/* Conditional Rendering of Table or Graph */}
      <div className="container mt-3">
        {/* {viewMode === "table" ? <TableView filters={filters} /> : <GraphView filters={filters} />} */}
        {viewMode === "graph" ? <GraphView filters={filters} /> : <TableView filters={filters} />}
        
      </div>
    </div>
  );
};

export default Home;



