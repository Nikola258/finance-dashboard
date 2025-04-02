import { Grid, Box, Typography, useTheme } from '@mui/material';
import { AccountBalance, TrendingUp, ShoppingBag, Savings } from '@mui/icons-material';
import StatCard from '../components/dashboard/StatCard';
import AreaChart from '../components/charts/AreaChart';
import PieChart from '../components/charts/PieChart';
import RecentTransactions from '../components/dashboard/RecentTransactions';
import TimeframeSelector from '../components/investments/TimeframeSelector';
import { useState, useEffect } from 'react';

const Dashboard = () => {
  const theme = useTheme();
  const [timeframe, setTimeframe] = useState('1M');
  const [loading, setLoading] = useState(true);
  const [dashboardData, setDashboardData] = useState({
    balanceHistory: [],
    expenseHistory: [],
    expenseCategories: [],
    recentTransactions: [],
    stats: {
      totalBalance: 0,
      totalIncome: 0,
      totalExpenses: 0,
      savingsRate: 0
    }
  });

  const generateData = (timeframe) => {
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

    // Generate balance history
    const balanceHistory = [];
    let balance = 5000;
    for (let i = numberOfPoints - 1; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - (i * interval));
      balance *= (1 + (Math.random() * 0.02 - 0.01)); // Random growth/decline
      balanceHistory.push({
        name: date.toLocaleString('default', { month: 'short', day: 'numeric' }),
        value: Math.round(balance)
      });
    }

    // Generate expense history
    const expenseHistory = [];
    let baseExpense = 1500;
    for (let i = numberOfPoints - 1; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - (i * interval));
      baseExpense *= (1 + (Math.random() * 0.1 - 0.05)); // Random variation
      expenseHistory.push({
        name: date.toLocaleString('default', { month: 'short', day: 'numeric' }),
        value: Math.round(baseExpense)
      });
    }

    // Generate expense categories
    const expenseCategories = [
      { name: 'Housing', value: Math.round(1200 * (1 + Math.random() * 0.2)) },
      { name: 'Food', value: Math.round(650 * (1 + Math.random() * 0.2)) },
      { name: 'Transportation', value: Math.round(450 * (1 + Math.random() * 0.2)) },
      { name: 'Entertainment', value: Math.round(380 * (1 + Math.random() * 0.2)) },
      { name: 'Shopping', value: Math.round(520 * (1 + Math.random() * 0.2)) },
      { name: 'Others', value: Math.round(300 * (1 + Math.random() * 0.2)) }
    ];

    // Generate recent transactions
    const recentTransactions = [];
    const transactionTypes = [
      { title: 'Salary Deposit', category: 'Income', type: 'income', minAmount: 3000, maxAmount: 5000 },
      { title: 'Freelance Work', category: 'Income', type: 'income', minAmount: 500, maxAmount: 1500 },
      { title: 'Grocery Shopping', category: 'Food', type: 'expense', minAmount: 50, maxAmount: 200 },
      { title: 'Electric Bill', category: 'Housing', type: 'expense', minAmount: 80, maxAmount: 150 },
      { title: 'Restaurant Dinner', category: 'Food', type: 'expense', minAmount: 30, maxAmount: 100 },
      { title: 'Gas Station', category: 'Transport', type: 'expense', minAmount: 30, maxAmount: 80 },
      { title: 'Online Shopping', category: 'Shopping', type: 'expense', minAmount: 50, maxAmount: 200 },
      { title: 'Streaming Subscription', category: 'Other', type: 'expense', minAmount: 10, maxAmount: 20 }
    ];

    for (let i = 0; i < 10; i++) {
      const type = transactionTypes[Math.floor(Math.random() * transactionTypes.length)];
      const amount = Math.round(
        type.minAmount + Math.random() * (type.maxAmount - type.minAmount)
      );
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      
      recentTransactions.push({
        id: i + 1,
        title: type.title,
        amount,
        date: date.toLocaleString('default', { month: 'short', day: 'numeric' }),
        category: type.category,
        type: type.type
      });
    }

    // Calculate stats
    const totalExpenses = expenseCategories.reduce((sum, cat) => sum + cat.value, 0);
    const totalIncome = recentTransactions
      .filter(t => t.type === 'income')
      .reduce((sum, t) => sum + t.amount, 0);
    const savingsRate = ((totalIncome - totalExpenses) / totalIncome) * 100;

    return {
      balanceHistory,
      expenseHistory,
      expenseCategories,
      recentTransactions,
      stats: {
        totalBalance: Math.round(balance),
        totalIncome,
        totalExpenses,
        savingsRate: Math.round(savingsRate * 10) / 10
      }
    };
  };

  useEffect(() => {
    setLoading(true);
    const data = generateData(timeframe);
    setDashboardData(data);
    setLoading(false);
  }, [timeframe]);

  if (loading) {
    return <Box p={3}>Loading...</Box>;
  }
  
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
            value={`$${dashboardData.stats.totalBalance.toLocaleString()}`}
            icon={<AccountBalance />}
            trend="vs last period"
            trendValue={8.2}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Total Income"
            value={`$${dashboardData.stats.totalIncome.toLocaleString()}`}
            icon={<TrendingUp />}
            trend="vs last period"
            trendValue={4.5}
            color="success"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Total Expenses"
            value={`$${dashboardData.stats.totalExpenses.toLocaleString()}`}
            icon={<ShoppingBag />}
            trend="vs last period"
            trendValue={-2.8}
            color="error"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Savings Rate"
            value={`${dashboardData.stats.savingsRate}%`}
            icon={<Savings />}
            trend="vs last period"
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
            data={dashboardData.balanceHistory}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <PieChart 
            title="Expense Categories" 
            data={dashboardData.expenseCategories}
          />
        </Grid>
      </Grid>
      
      {/* Additional Charts & Data */}
      <Grid container spacing={3}>
        <Grid item xs={12} md={5}>
          <AreaChart 
            title="Expense History" 
            data={dashboardData.expenseHistory}
            color="error"
          />
        </Grid>
        <Grid item xs={12} md={7}>
          <RecentTransactions transactions={dashboardData.recentTransactions} />
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard; 