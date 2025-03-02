 import React, { useState } from "react";
import { Navbar, Nav, Container, Button } from "react-bootstrap";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
} from "recharts";
import { HouseDoor, ListCheck, BarChart as BarChartIcon } from "react-bootstrap-icons";
import { useNavigate } from "react-router-dom";
import { FaSignOutAlt } from "react-icons/fa";

// Dummy data (replace with actual data)
const sampleData = [
  { name: "Mon", income: 200, expense: 150 },
  { name: "Tue", income: 250, expense: 100 },
  { name: "Wed", income: 300, expense: 200 },
  { name: "Thu", income: 280, expense: 180 },
  { name: "Fri", income: 320, expense: 220 },
  { name: "Sat", income: 350, expense: 250 },
  { name: "Sun", income: 400, expense: 300 },
];

const Report = ({ chartData = sampleData }) => {
  const [chartType, setChartType] = useState("bar");
  const [dataType, setDataType] = useState("income_vs_expense");
  const [timeFilter, setTimeFilter] = useState("daily");
  const navigate = useNavigate();

  const handleLogout = () => {
    console.log("User logged out");
  };

  // Function to filter chart data based on timeFilter
  const filterChartData = () => {
    if (timeFilter === "daily") {
      return chartData; // Show data for each day of the week
    } else if (timeFilter === "weekly") {
      return [
        { name: "Week 1", income: 1400, expense: 1200 },
        { name: "Week 2", income: 1500, expense: 1300 },
        { name: "Week 3", income: 1600, expense: 1400 },
        { name: "Week 4", income: 1700, expense: 1500 },
      ];
    } else if (timeFilter === "monthly") {
      return Array.from({ length: 30 }, (_, i) => ({
        name: `Day ${i + 1}`,
        income: Math.floor(Math.random() * 500),
        expense: Math.floor(Math.random() * 400),
      }));
    } else if (timeFilter === "yearly") {
      return [
        { name: "Jan", income: 5000, expense: 4200 },
        { name: "Feb", income: 5500, expense: 4700 },
        { name: "Mar", income: 6000, expense: 5200 },
        { name: "Apr", income: 5800, expense: 5000 },
        { name: "May", income: 6200, expense: 5300 },
        { name: "Jun", income: 6400, expense: 5500 },
        { name: "Jul", income: 6600, expense: 5700 },
        { name: "Aug", income: 7000, expense: 6000 },
        { name: "Sep", income: 7200, expense: 6200 },
        { name: "Oct", income: 7400, expense: 6400 },
        { name: "Nov", income: 7800, expense: 6700 },
        { name: "Dec", income: 8000, expense: 7000 },
      ];
    }
    return chartData;
  };
    

  const filteredData = filterChartData();

  return (
    <>
      {/* Navbar */}
      <Navbar expand="lg" className="bg-light shadow p-3">
        <Container>
          <Navbar.Brand className="fw-bold text-black">Personal Finance Manager</Navbar.Brand>
          <Navbar.Toggle aria-controls="navbar-nav" />
          <Navbar.Collapse id="navbar-nav" className="justify-content-end">
            <Nav className="custom-nav">
              <Nav.Link onClick={() => navigate("/home")}>
                <HouseDoor className="me-2" /> Home
              </Nav.Link>
              <Nav.Link onClick={() => navigate("/transaction")}>
                <ListCheck className="me-2" /> Transactions
              </Nav.Link>
              <Nav.Link onClick={() => navigate("/reports")}>
                <BarChartIcon className="me-2" /> Reports
              </Nav.Link>
            </Nav>
            <Button variant="danger" className="ms-3 d-flex align-items-center" onClick={handleLogout}>
              <FaSignOutAlt className="me-2" /> Logout
            </Button>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <p className="finance-quote">"Money grows when you manage it well."</p>

      {/* Chart Section */}
      <div className="container mt-4">
        <h2 className="text-center">Financial Reports</h2>

        {/* Chart Filters */}
        <div className="d-flex justify-content-center flex-wrap gap-3">
          <div>
            <label htmlFor="chartType" className="fw-bold">Select Chart Type:</label>
            <select id="chartType" className="form-select" value={chartType} onChange={(e) => setChartType(e.target.value)}>
              <option value="bar">Bar Chart</option>
              <option value="line">Line Chart</option>
              
            </select>
          </div>

          <div>
            <label htmlFor="timeFilter" className="fw-bold">Filter By:</label>
            <select id="timeFilter" className="form-select" value={timeFilter} onChange={(e) => setTimeFilter(e.target.value)}>
              <option value="daily">Daily</option>
              <option value="monthly">Monthly</option>
              <option value="yearly">Yearly</option>
              <option value="weekly">Weekly</option>
            </select>
          </div>
        </div>

        {/* Chart Display */}
        <div className="mt-4 d-flex justify-content-center">
          {filteredData.length === 0 ? (
            <p className="text-center text-danger fw-bold">No data available</p>
          ) : (
            <>
              {chartType === "bar" && (
                <ResponsiveContainer width="80%" height={300}>
                  <BarChart data={filteredData}>
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="expense" fill="#E50046">
                      {filteredData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={index % 2 === 0 ? "#9ACBD0" : "#48A6A7"} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              )}

              {chartType === "line" && (
                <ResponsiveContainer width="80%" height={300}>
                  <LineChart data={filteredData}>
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="expense" stroke="#E50046" />
                  </LineChart>
                </ResponsiveContainer>
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Report;
