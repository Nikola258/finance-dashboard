import { useState, useEffect } from 'react';
import { Card, CardContent, Typography, Box, ButtonGroup, Button, useTheme, CircularProgress } from '@mui/material';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import axios from 'axios';

const PriceChart = ({ coinId, coinName, color = 'primary' }) => {
  const theme = useTheme();
  const [timeframe, setTimeframe] = useState('7d'); // 24h, 7d, 30d, 90d, 1y, max
  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    const fetchChartData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Map timeframe to days
        const days = {
          '24h': 1,
          '7d': 7,
          '30d': 30,
          '90d': 90,
          '1y': 365,
          'max': 'max'
        }[timeframe];
        
        const response = await axios.get(
          `https://api.coingecko.com/api/v3/coins/${coinId}/market_chart`,
          {
            params: {
              vs_currency: 'usd',
              days: days,
              interval: days === 1 ? 'hourly' : 'daily'
            }
          }
        );
        
        // Format the data for the chart
        const formattedData = response.data.prices.map(([timestamp, price]) => ({
          date: new Date(timestamp).toLocaleDateString(),
          time: new Date(timestamp).toLocaleTimeString(),
          price
        }));
        
        setChartData(formattedData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching chart data:', error);
        setError('Failed to load price chart data. Please try again later.');
        setLoading(false);
      }
    };
    
    if (coinId) {
      fetchChartData();
    }
  }, [coinId, timeframe]);
  
  // Format currency
  const formatCurrency = (num) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: num < 1 ? 4 : 2,
      maximumFractionDigits: num < 1 ? 6 : 2,
    }).format(num);
  };
  
  // Custom tooltip formatter
  const formatTooltip = (value, name, props) => {
    if (name === 'price') {
      return [formatCurrency(value), 'Price'];
    }
    return [value, name];
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
        {/* Chart header with title and timeframe filters */}
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            {coinName} Price
          </Typography>
          <ButtonGroup size="small" variant="outlined">
            <Button 
              onClick={() => setTimeframe('24h')}
              sx={{ 
                borderColor: timeframe === '24h' ? theme.palette[color].main : undefined,
                color: timeframe === '24h' ? theme.palette[color].main : undefined,
                fontWeight: timeframe === '24h' ? 600 : 400,
              }}
            >
              24H
            </Button>
            <Button 
              onClick={() => setTimeframe('7d')}
              sx={{ 
                borderColor: timeframe === '7d' ? theme.palette[color].main : undefined,
                color: timeframe === '7d' ? theme.palette[color].main : undefined,
                fontWeight: timeframe === '7d' ? 600 : 400,
              }}
            >
              7D
            </Button>
            <Button 
              onClick={() => setTimeframe('30d')}
              sx={{ 
                borderColor: timeframe === '30d' ? theme.palette[color].main : undefined,
                color: timeframe === '30d' ? theme.palette[color].main : undefined,
                fontWeight: timeframe === '30d' ? 600 : 400,
              }}
            >
              30D
            </Button>
            <Button 
              onClick={() => setTimeframe('90d')}
              sx={{ 
                borderColor: timeframe === '90d' ? theme.palette[color].main : undefined,
                color: timeframe === '90d' ? theme.palette[color].main : undefined,
                fontWeight: timeframe === '90d' ? 600 : 400,
              }}
            >
              90D
            </Button>
            <Button 
              onClick={() => setTimeframe('1y')}
              sx={{ 
                borderColor: timeframe === '1y' ? theme.palette[color].main : undefined,
                color: timeframe === '1y' ? theme.palette[color].main : undefined,
                fontWeight: timeframe === '1y' ? 600 : 400,
              }}
            >
              1Y
            </Button>
          </ButtonGroup>
        </Box>
        
        {/* Chart content */}
        <Box sx={{ height: 300, width: '100%' }}>
          {loading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
              <CircularProgress size={40} />
            </Box>
          ) : error ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
              <Typography color="error">{error}</Typography>
            </Box>
          ) : (
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={chartData}
                margin={{
                  top: 10,
                  right: 5,
                  left: 20,
                  bottom: 5,
                }}
              >
                <defs>
                  <linearGradient id={`gradientColor-${coinId}`} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={theme.palette[color].main} stopOpacity={0.8}/>
                    <stop offset="95%" stopColor={theme.palette[color].main} stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke={theme.palette.divider} />
                <XAxis 
                  dataKey={timeframe === '24h' ? 'time' : 'date'} 
                  tick={{ fill: theme.palette.text.secondary, fontSize: 12 }}
                  tickLine={false}
                  axisLine={{ stroke: theme.palette.divider }}
                  tickFormatter={(value) => {
                    // Simplify date format based on timeframe
                    if (timeframe === '24h') {
                      return value.substring(0, 5); // Show only hours and minutes
                    } else if (timeframe === '7d' || timeframe === '30d') {
                      const date = new Date(value);
                      return `${date.getMonth() + 1}/${date.getDate()}`; // Show MM/DD
                    } else {
                      return value; // Use default format
                    }
                  }}
                />
                <YAxis 
                  tick={{ fill: theme.palette.text.secondary, fontSize: 12 }}
                  tickLine={false}
                  axisLine={{ stroke: theme.palette.divider }}
                  tickFormatter={(value) => {
                    // Format Y-axis to use k, M, B for large numbers
                    if (value >= 1000000000) {
                      return `$${(value / 1000000000).toFixed(1)}B`;
                    } else if (value >= 1000000) {
                      return `$${(value / 1000000).toFixed(1)}M`;
                    } else if (value >= 1000) {
                      return `$${(value / 1000).toFixed(1)}K`;
                    } else {
                      return `$${value.toFixed(value < 1 ? 2 : 0)}`;
                    }
                  }}
                />
                <Tooltip 
                  formatter={formatTooltip}
                  contentStyle={{
                    backgroundColor: theme.palette.background.paper,
                    borderColor: theme.palette.divider,
                    borderRadius: 8,
                    boxShadow: theme.shadows[3],
                    color: theme.palette.text.primary,
                  }}
                  labelFormatter={(label) => {
                    const dataPoint = chartData.find(point => 
                      timeframe === '24h' ? point.time === label : point.date === label
                    );
                    if (dataPoint) {
                      return timeframe === '24h' 
                        ? `${dataPoint.date} ${dataPoint.time}`
                        : dataPoint.date;
                    }
                    return label;
                  }}
                />
                <Area 
                  type="monotone" 
                  dataKey="price" 
                  stroke={theme.palette[color].main} 
                  fillOpacity={1} 
                  fill={`url(#gradientColor-${coinId})`} 
                />
              </AreaChart>
            </ResponsiveContainer>
          )}
        </Box>
      </CardContent>
    </Card>
  );
};

export default PriceChart; 