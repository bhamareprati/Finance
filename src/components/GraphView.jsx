/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState, useEffect } from "react";
import axios from "axios";
import TableView from "./TableView";
import { Card, CardBody, CardTitle } from "reactstrap";
import "./style.css";

const GraphView = ({ filters }) => {
  const [summary, setSummary] = useState({ totalIncome: 0, totalExpense: 0, balance: 0 });

  useEffect(() => {
    fetchSummary();
  }, [filters]);

  const fetchSummary = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/expenses/summary", { params: filters });
      setSummary(response.data);
    } catch (error) {
      console.error("Error fetching summary:", error);
    }
  };

  return (
    <div className="row text-center">
      <div className="col-md-4">
        <Card className="shadow-sm bg-success text-white">
          <CardBody>
            <CardTitle tag="h5">Total Income</CardTitle>
            <h3>${summary.totalIncome}</h3>
          </CardBody>
        </Card>
      </div>
      <div className="col-md-4">
        <Card className="shadow-sm bg-danger text-white">
          <CardBody>
            <CardTitle tag="h5">Total Expense</CardTitle>
            <h3>${summary.totalExpense}</h3>
          </CardBody>
        </Card>
      </div>
      <div className="col-md-4">
        <Card className="shadow-sm bg-primary text-white">
          <CardBody>
            <CardTitle tag="h5">Balance</CardTitle>
            <h3>${summary.balance}</h3>
          </CardBody>
        </Card>
      </div>
    </div>
  );
};

export default GraphView;