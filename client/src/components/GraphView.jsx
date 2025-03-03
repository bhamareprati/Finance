import React, { useState, useEffect } from "react";
import axios from "axios";
import { Card, CardBody, CardTitle } from "reactstrap";
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Tooltip, XAxis, YAxis, Legend, ResponsiveContainer, Cell } from "recharts";
import "./style.css";

// Import images
import incomeImg from "../assets/income.jpg";
import expenseImg from "../assets/expenditure.png";
import balanceImg from "../assets/total.png";

const GraphView = ({ filters }) => {
  const [summary, setSummary] = useState({
    totalIncome: 5000,  // Default Income
    totalExpense: 3000, // Default Expense
    balance: 2000,      // Default Balance
  });

  const [chartType, setChartType] = useState("bar"); // Default chart type

  useEffect(() => {
    fetchSummary();
  }, [filters]);  // ✅ Triggers fetch whenever filters change
  
  //new
  const fetchSummary = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/expenses/summary", { params: filters });
  
      if (response.data) {
        setSummary({
          totalIncome: response.data.totalIncome || 0,
          totalExpense: response.data.totalExpense || 0,
          balance: (response.data.totalIncome || 0) - (response.data.totalExpense || 0),
        });
      }
    } catch (error) {
      console.error("Error fetching summary:", error);
    }
  };
  
  const chartData = [
    { name: "Income", value: summary.totalIncome || 5000 },
    { name: "Expense", value: summary.totalExpense || 3000 },
  ];

  return (
    <div className="container text-center">
      {/* Summary Cards */}
      <div className="row">
        <div className="col-md-4">
          <Card className="shadow-sm bg-success text-white">
            <img src={incomeImg} className="card-img-top" alt="Total Income" />
            <CardBody>
              <CardTitle tag="h5">Total Income</CardTitle>
              <h3>Rs.{summary.totalIncome}</h3>
            </CardBody>
          </Card>
        </div>
        <div className="col-md-4">
          <Card className="shadow-sm bg-danger text-white">
            <img src={expenseImg} className="card-img-top" alt="Expense" />
            <CardBody>
              <CardTitle tag="h5">Total Expense</CardTitle>
              <h3>Rs.{summary.totalExpense}</h3>
            </CardBody>
          </Card>
        </div>
        <div className="col-md-4">
          <Card className="shadow-sm bg-primary text-white">
            <img src={balanceImg} className="card-img-top" alt="Balance" />
            <CardBody>
              <CardTitle tag="h5">Balance</CardTitle>
              <h3>Rs.{summary.balance}</h3>
            </CardBody>
          </Card>
        </div>
      </div>

    
    </div>
  );
};

export default GraphView;
