import React, { useState, useEffect } from 'react';
import { Box, Typography, Card, CardContent, Grid } from '@mui/material';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip, LineChart, Line, XAxis, YAxis, CartesianGrid } from 'recharts';
import TimeframeSelector from '../investments/TimeframeSelector';

const ExpensesPage = () => {
  const [timeframe, setTimeframe] = useState('1M');
  const [expenseData, setExpenseData] = useState({ expenses: [], totalExpense: 0, change: 0, history: [] });
  const [loading, setLoading] = useState(true);

  const EXPENSE_CATEGORIES = [
    { name: 'Housing', baseValue: 1200, color: '#FF6384', volatility: 0.05 },
    { name: 'Food', baseValue: 400, color: '#36A2EB', volatility: 0.15 },
    { name: 'Transportation', baseValue: 200, color: '#FFCE56', volatility: 0.10 },
    { name: 'Utilities', baseValue: 150, color: '#4BC0C0', volatility: 0.08 },
    { name: 'Entertainment', baseValue: 100, color: '#9966FF', volatility: 0.20 }
  ];

  const generateExpenseHistory = (timeframe) => {
    const today = new Date();
    let numberOfMonths;
    
    switch(timeframe) {
      case '1W':
        numberOfMonths = 3;
        break;
      case '1M':
        numberOfMonths = 6;
        break;
      case '3M':
        numberOfMonths = 12;
        break;
      case '1Y':
        numberOfMonths = 24;
        break;
      case 'ALL':
        numberOfMonths = 36;
        break;
      default:
        numberOfMonths = 12;
    }

    let history = [];
    let baseExpense = 2050; // Base monthly expense

    for (let i = numberOfMonths - 1; i >= 0; i--) {
      const date = new Date(today);
      date.setMonth(date.getMonth() - i);
      
      // Add seasonal variations (higher in winter months, lower in summer)
      const month = date.getMonth();
      const seasonalFactor = 1 + Math.sin((month + 3) * Math.PI / 6) * 0.1;
      
      // Add some random variation
      const randomFactor = 1 + (Math.random() * 0.2 - 0.1);
      
      const totalExpense = Math.round(baseExpense * seasonalFactor * randomFactor);
      
      history.push({
        date: date.toLocaleString('default', { month: 'short', year: 'numeric' }),
        expense: totalExpense
      });

      // Gradually increase base expense over time (inflation)
      baseExpense *= 1.002; // 0.2% monthly inflation
    }

    return history;
  };

  const generateMonthlyExpenses = (timeframe) => {
    const monthsMapping = {
        '1W': 0.25,
        '1M': 1,
        '3M': 3,
        '1Y': 12,
        'ALL': 24
    };

    const monthsToShow = monthsMapping[timeframe] || 1;
    let totalExpense = 0;

    const expenses = EXPENSE_CATEGORIES.map(category => {
      const variation = 1 + ((Math.random() * 2 - 1) * category.volatility * monthsToShow);
      const value = Math.round(category.baseValue * variation);
      totalExpense += value;
      return {
        name: category.name,
        value,
        color: category.color
      };
    });

    const previousTotal = 2050;
    const change = ((totalExpense - previousTotal) / previousTotal) * 100;

    const history = generateExpenseHistory(timeframe);

    return {
      expenses,
      totalExpense,
      change,
      history
    };
  };

  useEffect(() => {
    setLoading(true);
    const data = generateMonthlyExpenses(timeframe);
    setExpenseData(data);
    setLoading(false);
  }, [timeframe]);

  if (loading) {
    return <Box p={3}>Loading...</Box>;
  }

  return (
    <Box className="page-container" sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Typography variant="h4">Monthly Expenses</Typography>
        <TimeframeSelector timeframe={timeframe} setTimeframe={setTimeframe} />
      </Box>
      <Grid container spacing={3}>
        <Grid item xs={12} md={7}>
          <Card className="card hover-effect">
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2 }}>Expense Distribution</Typography>
              <ResponsiveContainer width="100%" height={400}>
                <PieChart>
                  <Pie
                    data={expenseData.expenses}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={150}
                    label={({ name, value }) => `${name}: $${value}`}
                  >
                    {expenseData.expenses.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => `$${value}`} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={5}>
          <Card className="card hover-effect">
            <CardContent>
              <Typography variant="h6">Total Monthly Expenses</Typography>
              <Typography variant="h3" sx={{ my: 2 }}>
                ${expenseData.totalExpense.toLocaleString()}
              </Typography>
              <Typography 
                variant="body2" 
                color={expenseData.change >= 0 ? 'error.main' : 'success.main'}
              >
                {expenseData.change >= 0 ? '+' : ''}{expenseData.change.toFixed(1)}% from previous period
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12}>
          <Card className="card hover-effect">
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2 }}>Expense History</Typography>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={expenseData.history}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis domain={[0, 'auto']} />
                  <Tooltip formatter={(value) => `$${value.toLocaleString()}`} />
                  <Line 
                    type="monotone" 
                    dataKey="expense" 
                    stroke="#FF6384"
                    strokeWidth={2}
                    dot={{ r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ExpensesPage; 