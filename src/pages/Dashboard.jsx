import React, { useState, useEffect } from 'react';
import { Grid, Box, Typography, useTheme, Paper } from '@mui/material';
import { AccountBalance, TrendingUp, ShoppingBag, Savings } from '@mui/icons-material';
import StatCard from '../components/dashboard/StatCard';
import AreaChart from '../components/charts/AreaChart';
import PieChart from '../components/charts/PieChart';
import RecentTransactions from '../components/dashboard/RecentTransactions';
import TimeframeSelector from '../components/investments/TimeframeSelector';
import { 
  balanceHistoryData, 
  expenseHistoryData, 
  expenseCategoryData,
  recentTransactionsData,
  financialStatsData
} from '../utils/mockData';

const Dashboard = () => {
  const theme = useTheme();
  const [timeframe, setTimeframe] = useState('1M');
  const [chartData, setChartData] = useState({
    balanceHistory: balanceHistoryData,
    expenseHistory: expenseHistoryData
  });
  
  const { totalBalance, totalIncome, totalExpenses, savingsRate } = financialStatsData;

  useEffect(() => {
    const generateTimeframeData = (data, timeframe) => {
      const today = new Date();
      let numberOfPoints;
      let interval;

      switch(timeframe) {
        case '1W':
          numberOfPoints = 7;
          interval = 1; // 1 day
          break;
        case '1M':
          numberOfPoints = 30;
          interval = 1; // 1 day
          break;
        case '3M':
          numberOfPoints = 12;
          interval = 7; // 1 week
          break;
        case '1Y':
          numberOfPoints = 12;
          interval = 30; // 1 month
          break;
        case 'ALL':
          numberOfPoints = 24;
          interval = 30; // 1 month
          break;
        default:
          numberOfPoints = 30;
          interval = 1;
      }

      // Generate dates
      const dates = [];
      for (let i = numberOfPoints - 1; i >= 0; i--) {
        const date = new Date(today);
        date.setDate(date.getDate() - (i * interval));
        dates.push(date.toISOString().split('T')[0]);
      }

      // Generate data points with some randomness
      let baseValue = data[0].value;
      return dates.map(date => {
        baseValue *= (1 + (Math.random() * 0.02 - 0.01));
        return {
          date,
          value: Math.round(baseValue)
        };
      });
    };

    // Generate new data for both charts based on timeframe
    const newBalanceHistory = generateTimeframeData(balanceHistoryData, timeframe);
    const newExpenseHistory = generateTimeframeData(expenseHistoryData, timeframe);

    setChartData({
      balanceHistory: newBalanceHistory,
      expenseHistory: newExpenseHistory
    });
  }, [timeframe]);
  
  return (
    <Box>
      {/* Page Title and Timeframe Selector */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: 600 }}>
          Financial Dashboard
        </Typography>
        <TimeframeSelector timeframe={timeframe} setTimeframe={setTimeframe} />
      </Box>
      
      {/* Stats Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Total Balance"
            value={`$${totalBalance.toLocaleString()}`}
            icon={<AccountBalance />}
            trend="vs last month"
            trendValue={8.2}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Total Income"
            value={`$${totalIncome.toLocaleString()}`}
            icon={<TrendingUp />}
            trend="vs last month"
            trendValue={4.5}
            color="success"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Total Expenses"
            value={`$${totalExpenses.toLocaleString()}`}
            icon={<ShoppingBag />}
            trend="vs last month"
            trendValue={-2.8}
            color="error"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Savings Rate"
            value={`${savingsRate}%`}
            icon={<Savings />}
            trend="vs last month"
            trendValue={1.2}
            color="secondary"
          />
        </Grid>
      </Grid>
      
      {/* Charts */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} md={8}>
          <AreaChart 
            title="Balance History" 
            data={chartData.balanceHistory}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <PieChart 
            title="Expense Categories" 
            data={expenseCategoryData}
          />
        </Grid>
      </Grid>
      
      {/* Additional Charts & Data */}
      <Grid container spacing={3}>
        <Grid item xs={12} md={5}>
          <AreaChart 
            title="Expense History" 
            data={chartData.expenseHistory}
            color="error"
          />
        </Grid>
        <Grid item xs={12} md={7}>
          <RecentTransactions transactions={recentTransactionsData} />
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard; 