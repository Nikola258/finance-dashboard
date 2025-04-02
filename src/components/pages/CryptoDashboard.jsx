import React, { useState, useEffect } from 'react';
import { Box, Typography, Card, CardContent, Grid } from '@mui/material';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import TimeframeSelector from '../investments/TimeframeSelector';

const CryptoDashboard = () => {
  const [timeframe, setTimeframe] = useState('1M');
  const [cryptoData, setCryptoData] = useState({ prices: [], holdings: [] });
  const [loading, setLoading] = useState(true);

  const CRYPTO_ASSETS = [
    { name: 'Bitcoin', symbol: 'BTC', basePrice: 45000, volatility: 0.08, holding: 0.5 },
    { name: 'Ethereum', symbol: 'ETH', basePrice: 2500, volatility: 0.1, holding: 3.2 },
    { name: 'Cardano', symbol: 'ADA', basePrice: 0.5, volatility: 0.15, holding: 2000 },
    { name: 'Solana', symbol: 'SOL', basePrice: 100, volatility: 0.12, holding: 25 }
  ];

  const generatePriceData = (timeframe) => {
    const today = new Date();
    let numberOfPoints;
    let interval;

    switch(timeframe) {
      case '1W':
        numberOfPoints = 168; // hourly for a week
        interval = 1;
        break;
      case '1M':
        numberOfPoints = 30; // daily for a month
        interval = 24;
        break;
      case '3M':
        numberOfPoints = 90; // daily for 3 months
        interval = 24;
        break;
      case '1Y':
        numberOfPoints = 365; // daily for a year
        interval = 24;
        break;
      case 'ALL':
        numberOfPoints = 730; // daily for 2 years
        interval = 24;
        break;
      default:
        numberOfPoints = 30;
        interval = 24;
    }

    let prices = [];
    let currentPrices = {};
    
    // Initialize with base prices
    CRYPTO_ASSETS.forEach(asset => {
      currentPrices[asset.symbol] = asset.basePrice;
    });

    for (let i = numberOfPoints - 1; i >= 0; i--) {
      const date = new Date(today);
      date.setHours(date.getHours() - (i * interval));

      let dataPoint = {
        date: date.toISOString().split('T')[0]
      };

      // Update prices with random walk
      CRYPTO_ASSETS.forEach(asset => {
        const change = (Math.random() * 2 - 1) * asset.volatility;
        currentPrices[asset.symbol] *= (1 + change);
        dataPoint[asset.symbol] = Math.round(currentPrices[asset.symbol] * 100) / 100;
      });

      prices.push(dataPoint);
    }

    // Calculate holdings value
    const holdings = CRYPTO_ASSETS.map(asset => {
      const currentPrice = currentPrices[asset.symbol];
      const value = currentPrice * asset.holding;
      const previousPrice = prices[0][asset.symbol];
      const previousValue = previousPrice * asset.holding;
      const change = ((value - previousValue) / previousValue) * 100;

      return {
        name: asset.name,
        symbol: asset.symbol,
        price: currentPrice,
        holding: asset.holding,
        value: value,
        change: change
      };
    });

    return {
      prices,
      holdings
    };
  };

  useEffect(() => {
    setLoading(true);
    const data = generatePriceData(timeframe);
    setCryptoData(data);
    setLoading(false);
  }, [timeframe]);

  if (loading) {
    return <Box p={3}>Loading...</Box>;
  }

  return (
    <Box className="page-container" sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Typography variant="h4">Crypto Dashboard</Typography>
        <TimeframeSelector timeframe={timeframe} setTimeframe={setTimeframe} />
      </Box>
      <Grid container spacing={3}>
        {cryptoData.holdings.map((asset) => (
          <Grid item xs={12} sm={6} md={3} key={asset.symbol}>
            <Card className="card hover-effect">
              <CardContent>
                <Typography variant="h6">{asset.name}</Typography>
                <Typography variant="h4" sx={{ my: 2 }}>${asset.price.toLocaleString()}</Typography>
                <Typography variant="body2" color={asset.change >= 0 ? 'success.main' : 'error.main'}>
                  {asset.change >= 0 ? '+' : ''}{asset.change.toFixed(1)}% this period
                </Typography>
                <Typography variant="body2" sx={{ mt: 1 }}>
                  Holdings: {asset.holding} {asset.symbol}
                </Typography>
                <Typography variant="body2">
                  Value: ${asset.value.toLocaleString()}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
        <Grid item xs={12}>
          <Card className="card hover-effect">
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2 }}>Price History</Typography>
              <ResponsiveContainer width="100%" height={400}>
                <LineChart data={cryptoData.prices}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip formatter={(value) => `$${value}`} />
                  {CRYPTO_ASSETS.map((asset, index) => (
                    <Line
                      key={asset.symbol}
                      type="monotone"
                      dataKey={asset.symbol}
                      stroke={['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'][index]}
                      dot={false}
                    />
                  ))}
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default CryptoDashboard; 