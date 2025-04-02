import React, { useState, useEffect } from 'react';
import { Box, Typography } from '@mui/material';
import InvestmentOverview from './InvestmentOverview';
import PortfolioChart from './PortfolioChart';
import TimeframeSelector from './TimeframeSelector';

const InvestmentPage = () => {
  const [timeframe, setTimeframe] = useState('1M');
  const [investmentData, setInvestmentData] = useState([]);
  const [loading, setLoading] = useState(true);

  // Function to generate dates based on timeframe
  const generateDates = (timeframe) => {
    const dates = [];
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

    for (let i = numberOfPoints - 1; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - (i * interval));
      dates.push(date.toISOString().split('T')[0]);
    }
    return dates;
  };

  // Function to generate random growth data
  const generateGrowthData = (dates) => {
    let stocks = 4000;
    let crypto = 2500;
    let bonds = 1500;
    
    return dates.map(date => {
      // Add random growth/decline (-3% to +5%)
      stocks *= (1 + (Math.random() * 0.08 - 0.03));
      crypto *= (1 + (Math.random() * 0.12 - 0.05));
      bonds *= (1 + (Math.random() * 0.03 - 0.01));

      return {
        date,
        stocks: Math.round(stocks),
        crypto: Math.round(crypto),
        bonds: Math.round(bonds),
        value: Math.round(stocks + crypto + bonds)
      };
    });
  };

  // Update data when timeframe changes
  useEffect(() => {
    setLoading(true);
    const dates = generateDates(timeframe);
    const newData = generateGrowthData(dates);
    setInvestmentData(newData);
    setLoading(false);
  }, [timeframe]);

  // Calculate portfolio stats based on latest data
  const getPortfolioStats = () => {
    if (investmentData.length === 0) return [];

    const latest = investmentData[investmentData.length - 1];
    const previous = investmentData[0];

    const calculateChange = (current, previous) => {
      const change = ((current - previous) / previous) * 100;
      return {
        value: `$${current.toLocaleString()}`,
        change: `${change >= 0 ? '+' : ''}${change.toFixed(1)}%`,
        isPositive: change >= 0
      };
    };

    return [
      {
        title: 'Stocks',
        ...calculateChange(latest.stocks, previous.stocks)
      },
      {
        title: 'Cryptocurrency',
        ...calculateChange(latest.crypto, previous.crypto)
      },
      {
        title: 'Bonds',
        ...calculateChange(latest.bonds, previous.bonds)
      }
    ];
  };

  if (loading) {
    return <Box p={3}>Loading...</Box>;
  }

  return (
    <Box className="page-container" sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Typography variant="h4">Investment Portfolio</Typography>
        <TimeframeSelector timeframe={timeframe} setTimeframe={setTimeframe} />
      </Box>

      <InvestmentOverview portfolioStats={getPortfolioStats()} />
      <Box sx={{ mt: 3 }}>
        <PortfolioChart data={investmentData} />
      </Box>
    </Box>
  );
};

export default InvestmentPage; 