import React, { useState, useEffect } from 'react';
import { Box, Typography, Card, CardContent, Grid, List, ListItem, ListItemText, ListItemIcon, Divider } from '@mui/material';
import { ArrowUpward, ArrowDownward } from '@mui/icons-material';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import TimeframeSelector from '../investments/TimeframeSelector';

const WalletPage = () => {
  const [timeframe, setTimeframe] = useState('1M');
  const [walletData, setWalletData] = useState({ transactions: [], balance: 0, change: 0, balanceHistory: [] });
  const [loading, setLoading] = useState(true);

  const TRANSACTION_TYPES = [
    { name: 'Salary Deposit', type: 'income', minAmount: 2500, maxAmount: 4000 },
    { name: 'Freelance Payment', type: 'income', minAmount: 300, maxAmount: 800 },
    { name: 'Grocery Store', type: 'expense', minAmount: 50, maxAmount: 200 },
    { name: 'Restaurant', type: 'expense', minAmount: 20, maxAmount: 100 },
    { name: 'Utilities', type: 'expense', minAmount: 100, maxAmount: 300 },
    { name: 'Online Shopping', type: 'expense', minAmount: 30, maxAmount: 150 }
  ];

  const generateBalanceHistory = (timeframe) => {
    const today = new Date();
    let numberOfMonths;
    
    switch(timeframe) {
      case '1W':
        numberOfMonths = 1;
        break;
      case '1M':
        numberOfMonths = 3;
        break;
      case '3M':
        numberOfMonths = 6;
        break;
      case '1Y':
        numberOfMonths = 12;
        break;
      case 'ALL':
        numberOfMonths = 24;
        break;
      default:
        numberOfMonths = 12;
    }

    let history = [];
    let runningBalance = 2500; // Starting balance 6 months ago

    for (let i = numberOfMonths - 1; i >= 0; i--) {
      const date = new Date(today);
      date.setMonth(date.getMonth() - i);
      
      // Add some randomness to the balance changes
      const monthlyIncome = 3000 + (Math.random() * 1000);
      const monthlyExpenses = 2000 + (Math.random() * 800);
      runningBalance += (monthlyIncome - monthlyExpenses);

      history.push({
        date: date.toLocaleString('default', { month: 'short', year: 'numeric' }),
        balance: Math.round(runningBalance)
      });
    }

    return history;
  };

  const generateTransactions = (timeframe) => {
    const today = new Date();
    let numberOfDays;

    const daysMapping = {
        '1W': 7,
        '1M': 30,
        '3M': 90,
        '1Y': 365,
        'ALL': 730
    };

    numberOfDays = daysMapping[timeframe] || 30;

    let transactions = [];
    let balance = 3000; // Starting balance
    const previousBalance = 3000;

    // Generate random transactions
    for (let i = numberOfDays - 1; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      
      // Generate 0-3 transactions per day
      const transactionsPerDay = Math.floor(Math.random() * 4);
      
      for (let j = 0; j < transactionsPerDay; j++) {
        const transactionType = TRANSACTION_TYPES[Math.floor(Math.random() * TRANSACTION_TYPES.length)];
        const amount = Math.round(
          transactionType.minAmount + 
          Math.random() * (transactionType.maxAmount - transactionType.minAmount)
        );

        if (transactionType.type === 'income') {
          balance += amount;
        } else {
          balance -= amount;
        }

        transactions.push({
          id: `${i}-${j}`,
          name: transactionType.name,
          amount: amount,
          type: transactionType.type,
          date: date.toISOString().split('T')[0]
        });
      }
    }

    // Sort transactions by date (newest first)
    transactions.sort((a, b) => new Date(b.date) - new Date(a.date));
    
    // Take only the last 10 transactions for display
    transactions = transactions.slice(0, 10);

    const change = ((balance - previousBalance) / previousBalance) * 100;

    const balanceHistory = generateBalanceHistory(timeframe);

    return {
      transactions,
      balance,
      change,
      balanceHistory
    };
  };

  useEffect(() => {
    setLoading(true);
    const data = generateTransactions(timeframe);
    setWalletData(data);
    setLoading(false);
  }, [timeframe]);

  if (loading) {
    return <Box p={3}>Loading...</Box>;
  }

  return (
    <Box className="page-container" sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Typography variant="h4">Digital Wallet</Typography>
        <TimeframeSelector timeframe={timeframe} setTimeframe={setTimeframe} />
      </Box>
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Card className="card hover-effect">
            <CardContent>
              <Typography variant="h6">Available Balance</Typography>
              <Typography variant="h3" sx={{ my: 2 }}>
                ${walletData.balance.toLocaleString()}
              </Typography>
              <Typography 
                variant="body2" 
                color={walletData.change >= 0 ? 'success.main' : 'error.main'}
              >
                {walletData.change >= 0 ? '+' : ''}{walletData.change.toFixed(1)}% this period
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={8}>
          <Card className="card hover-effect">
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2 }}>Balance History</Typography>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={walletData.balanceHistory}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis domain={[0, 'auto']} />
                  <Tooltip formatter={(value) => `$${value.toLocaleString()}`} />
                  <Line 
                    type="monotone" 
                    dataKey="balance" 
                    stroke="#2196F3"
                    strokeWidth={2}
                    dot={{ r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12}>
          <Card className="card hover-effect">
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2 }}>Recent Transactions</Typography>
              <List>
                {walletData.transactions.map((transaction) => (
                  <React.Fragment key={transaction.id}>
                    <ListItem>
                      <ListItemIcon>
                        {transaction.type === 'income' ? 
                          <ArrowUpward color="success" /> : 
                          <ArrowDownward color="error" />
                        }
                      </ListItemIcon>
                      <ListItemText 
                        primary={transaction.name}
                        secondary={transaction.date}
                      />
                      <Typography 
                        color={transaction.type === 'income' ? 'success.main' : 'error.main'}
                      >
                        {transaction.type === 'income' ? '+' : '-'}${Math.abs(transaction.amount).toFixed(2)}
                      </Typography>
                    </ListItem>
                    <Divider />
                  </React.Fragment>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default WalletPage; 