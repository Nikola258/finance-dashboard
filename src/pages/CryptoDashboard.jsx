import { Grid, Box, Typography, useTheme } from '@mui/material';
import { AccountBalance, TrendingUp, ShoppingBag, Savings } from '@mui/icons-material';
import StatCard from '../components/dashboard/StatCard';
import MarketShareChart from '../components/crypto/MarketShareChart';
import CoinList from '../components/crypto/CoinList';
import Favorites from '../components/crypto/Favorites';
import { useCryptoContext } from '../context/CryptoContext';

const CryptoDashboard = () => {
  const theme = useTheme();
  const { coins, loading, error } = useCryptoContext();
  
  // Calculate market overview statistics
  const calculateStats = () => {
    if (!coins || coins.length === 0) return { totalMarketCap: 0, totalVolume: 0, btcDominance: 0, ethDominance: 0 };
    
    const totalMarketCap = coins.reduce((sum, coin) => sum + coin.market_cap, 0);
    const totalVolume = coins.reduce((sum, coin) => sum + coin.total_volume, 0);
    
    // Calculate BTC and ETH market dominance
    const btc = coins.find(coin => coin.symbol === 'btc');
    const eth = coins.find(coin => coin.symbol === 'eth');
    
    const btcDominance = btc ? (btc.market_cap / totalMarketCap) * 100 : 0;
    const ethDominance = eth ? (eth.market_cap / totalMarketCap) * 100 : 0;
    
    return { totalMarketCap, totalVolume, btcDominance, ethDominance };
  };
  
  const { totalMarketCap, totalVolume, btcDominance, ethDominance } = calculateStats();
  
  // Format currency for large numbers
  const formatLargeNumber = (num) => {
    if (num >= 1000000000000) {
      return `$${(num / 1000000000000).toFixed(2)}T`;
    } else if (num >= 1000000000) {
      return `$${(num / 1000000000).toFixed(2)}B`;
    } else if (num >= 1000000) {
      return `$${(num / 1000000).toFixed(2)}M`;
    } else {
      return `$${num.toLocaleString()}`;
    }
  };
  
  return (
    <Box>
      {/* Page Title */}
      <Typography variant="h4" sx={{ mb: 4, fontWeight: 600 }}>
        Cryptocurrency Dashboard
      </Typography>
      
      {/* Market Overview Stats */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Total Market Cap"
            value={formatLargeNumber(totalMarketCap)}
            icon={<AccountBalance />}
            trend="vs last day"
            trendValue={coins.length > 0 ? coins[0].market_cap_change_percentage_24h : 0}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="24h Trading Volume"
            value={formatLargeNumber(totalVolume)}
            icon={<TrendingUp />}
            color="secondary"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="BTC Dominance"
            value={`${btcDominance.toFixed(2)}%`}
            icon={<ShoppingBag />}
            color="warning"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="ETH Dominance"
            value={`${ethDominance.toFixed(2)}%`}
            icon={<Savings />}
            color="info"
          />
        </Grid>
      </Grid>
      
      {/* Charts & Favorites */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} md={8}>
          <MarketShareChart />
        </Grid>
        <Grid item xs={12} md={4}>
          <Favorites />
        </Grid>
      </Grid>
      
      {/* Coin List */}
      <Box sx={{ mb: 4 }}>
        <CoinList />
      </Box>
    </Box>
  );
};

export default CryptoDashboard; 