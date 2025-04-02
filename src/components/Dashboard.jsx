import React, { useState, useEffect } from 'react';
import { Box, Typography } from '@mui/material';
import TimeframeSelector from './TimeframeSelector';
import BalanceHistoryChart from './BalanceHistoryChart'; // Assuming you have a separate component for balance history
import ExpenseHistoryChart from './ExpenseHistoryChart'; // Assuming you have a separate component for expense history

const Dashboard = () => {
  const [timeframe, setTimeframe] = useState('1M');
  const [balanceHistory, setBalanceHistory] = useState([]);
  const [expenseHistory, setExpenseHistory] = useState([]);

  const generateBalanceHistory = (timeframe) => {
    const today = new Date();
    let numberOfDays;

    switch (timeframe) {
      case '1W':
        numberOfDays = 7; // 1 week
        break;
      case '1M':
        numberOfDays = 30; // 1 month
        break;
      case '3M':
        numberOfDays = 90; // 3 months
        break;
      case '1Y':
        numberOfDays = 365; // 1 year
        break;
      case 'ALL':
        numberOfDays = 730; // 2 years
        break;
      default:
        numberOfDays = 30; // Default to 1 month
    }

    let history = [];
    let runningBalance = 2500; // Starting balance

    for (let i = 0; i < numberOfDays; i++) {
      const date = new Date(today);
      date.setDate(date.getDate() - i); // Go back in time

      const monthlyIncome = 3000 + (Math.random() * 1000);
      const monthlyExpenses = 2000 + (Math.random() * 800);
      runningBalance += (monthlyIncome - monthlyExpenses);

      history.push({
        date: date.toLocaleString('default', { month: 'short', day: 'numeric' }),
        balance: Math.round(runningBalance)
      });
    }

    return history.reverse(); // Reverse to show from oldest to newest
  };

  const generateExpenseHistory = (timeframe) => {
    const today = new Date();
    let numberOfDays;

    switch (timeframe) {
      case '1W':
        numberOfDays = 7; // 1 week
        break;
      case '1M':
        numberOfDays = 30; // 1 month
        break;
      case '3M':
        numberOfDays = 90; // 3 months
        break;
      case '1Y':
        numberOfDays = 365; // 1 year
        break;
      case 'ALL':
        numberOfDays = 730; // 2 years
        break;
      default:
        numberOfDays = 30; // Default to 1 month
    }

    let history = [];
    let baseExpense = 2050; // Base monthly expense

    for (let i = 0; i < numberOfDays; i++) {
      const date = new Date(today);
      date.setDate(date.getDate() - i); // Go back in time

      const seasonalFactor = 1 + Math.sin((date.getMonth() + 3) * Math.PI / 6) * 0.1;
      const randomFactor = 1 + (Math.random() * 0.2 - 0.1);
      const totalExpense = Math.round(baseExpense * seasonalFactor * randomFactor);
      history.push({
        date: date.toLocaleString('default', { month: 'short', day: 'numeric' }),
        expense: totalExpense
      });
      baseExpense *= 1.002; // Simulating inflation
    }

    return history.reverse(); // Reverse to show from oldest to newest
  };

  useEffect(() => {
    const balanceData = generateBalanceHistory(timeframe);
    const expenseData = generateExpenseHistory(timeframe);
    setBalanceHistory(balanceData);
    setExpenseHistory(expenseData);
  }, [timeframe]);

  return (
    <Box>
      <Typography variant="h4">Dashboard</Typography>
      <TimeframeSelector timeframe={timeframe} setTimeframe={setTimeframe} />
      <BalanceHistoryChart data={balanceHistory} />
      <ExpenseHistoryChart data={expenseHistory} />
    </Box>
  );
};

export default Dashboard; 