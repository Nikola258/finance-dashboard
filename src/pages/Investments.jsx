import React, { useState, useEffect } from 'react';
import { Box, Typography, Container, Grid } from '@mui/material';
import axios from 'axios';

const Investments = () => {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [selectedCoin, setSelectedCoin] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchCoins();
  }, []);

  const fetchCoins = async () => {
    try {
      const response = await axios.get('https://api.coingecko.com/api/v3/coins/markets', {
        params: {
          vs_currency: 'usd',
          order: 'market_cap_desc',
          per_page: 100,
          sparkline: false
        }
      });
      setCoins(response.data);
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch coins data');
      setLoading(false);
    }
  };

  if (loading) return <Box p={3}>Loading...</Box>;
  if (error) return <Box p={3}>{error}</Box>;

  return (
    <Container maxWidth="xl">
      <Box sx={{ py: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Cryptocurrency Investments
        </Typography>
        <Typography variant="subtitle1" color="text.secondary" gutterBottom>
          Track and manage your crypto portfolio
        </Typography>
        
        {/* Components will be added here */}
        <Grid container spacing={3}>
          {/* Market Overview */}
          <Grid item xs={12}>
            {/* Market overview component will go here */}
          </Grid>

          {/* Chart */}
          <Grid item xs={12} md={8}>
            {/* Price chart component will go here */}
          </Grid>

          {/* Top Coins */}
          <Grid item xs={12} md={4}>
            {/* Top coins component will go here */}
          </Grid>

          {/* Coin List */}
          <Grid item xs={12}>
            {/* Coin list component will go here */}
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default Investments; 