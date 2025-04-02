import { Card, CardContent, Typography, Box, useTheme } from '@mui/material';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { useCryptoContext } from '../../context/CryptoContext';

const MarketShareChart = () => {
  const theme = useTheme();
  const { topCoins, loading, error } = useCryptoContext();
  
  // If loading
  if (loading) {
    return (
      <Box sx={{ p: 3, textAlign: 'center' }}>
        <Typography>Loading market share data...</Typography>
      </Box>
    );
  }
  
  // If error
  if (error) {
    return (
      <Box sx={{ p: 3, textAlign: 'center' }}>
        <Typography color="error">{error}</Typography>
      </Box>
    );
  }
  
  // Prepare data for the pie chart
  const marketShareData = topCoins.map(coin => ({
    name: coin.symbol.toUpperCase(),
    value: coin.market_cap,
    color: generateColorFromString(coin.id),
    fullName: coin.name
  }));
  
  // Custom colors for chart segments
  const COLORS = [
    theme.palette.primary.main,
    theme.palette.secondary.main,
    theme.palette.success.main,
    theme.palette.warning.main,
    theme.palette.error.main,
    theme.palette.primary.light,
    theme.palette.secondary.light,
    theme.palette.success.light,
    theme.palette.warning.light,
    theme.palette.error.light,
  ];
  
  // Generate a hex color based on string
  function generateColorFromString(str) {
    // Use a simple hash function
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    
    // Convert to hex color
    let color = '#';
    for (let i = 0; i < 3; i++) {
      const value = (hash >> (i * 8)) & 0xFF;
      color += ('00' + value.toString(16)).substr(-2);
    }
    return color;
  }
  
  // Custom tooltip formatter
  const tooltipFormatter = (value, name, props) => {
    const coin = props.payload;
    return [
      `$${(value / 1000000000).toFixed(2)}B`, 
      `${coin.fullName} (${coin.name})`
    ];
  };
  
  // Custom legend formatter
  const legendFormatter = (value, entry, index) => {
    return (
      <span style={{ color: theme.palette.text.primary, marginRight: 10 }}>
        {`${value}`}
      </span>
    );
  };
  
  return (
    <Card
      elevation={0}
      sx={{
        height: '100%',
        borderRadius: 2,
      }}
    >
      <CardContent sx={{ padding: 3, height: '100%' }}>
        {/* Chart header */}
        <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
          Market Share (Top 10)
        </Typography>
        
        {/* Chart */}
        <Box sx={{ height: 300, width: '100%' }}>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={marketShareData}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                nameKey="name"
              >
                {marketShareData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip 
                formatter={tooltipFormatter}
                contentStyle={{
                  backgroundColor: theme.palette.background.paper,
                  borderColor: theme.palette.divider,
                  borderRadius: 8,
                  boxShadow: theme.shadows[3],
                  color: theme.palette.text.primary,
                }}
              />
              <Legend 
                formatter={legendFormatter}
                layout="vertical" 
                verticalAlign="middle" 
                align="right"
              />
            </PieChart>
          </ResponsiveContainer>
        </Box>
      </CardContent>
    </Card>
  );
};

export default MarketShareChart; 