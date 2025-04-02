import { useState } from 'react';
import { Card, CardContent, Typography, Box, ButtonGroup, Button, useTheme } from '@mui/material';
import { AreaChart as RechartsAreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const AreaChart = ({ title, data, dataKey = 'value', xAxisKey = 'name', color = 'primary' }) => {
  const theme = useTheme();
  const [timeframe, setTimeframe] = useState('monthly'); // weekly, monthly, yearly
  
  // Filtered data based on the selected timeframe
  // In a real app, this would likely come from an API
  const filteredData = data;
  
  return (
    <Card
      elevation={0}
      sx={{
        height: '100%',
        borderRadius: 2,
        overflow: 'visible',
      }}
    >
      <CardContent sx={{ padding: 3, height: '100%' }}>
        {/* Chart header with title and timeframe filters */}
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
          <Typography variant="h6" color="textPrimary" sx={{ fontWeight: 600 }}>
            {title}
          </Typography>
          <ButtonGroup size="small" variant="outlined" aria-label="timeframe options">
            <Button 
              onClick={() => setTimeframe('weekly')}
              sx={{ 
                borderColor: timeframe === 'weekly' ? theme.palette[color].main : undefined,
                color: timeframe === 'weekly' ? theme.palette[color].main : undefined,
                fontWeight: timeframe === 'weekly' ? 600 : 400,
              }}
            >
              Week
            </Button>
            <Button 
              onClick={() => setTimeframe('monthly')}
              sx={{ 
                borderColor: timeframe === 'monthly' ? theme.palette[color].main : undefined,
                color: timeframe === 'monthly' ? theme.palette[color].main : undefined,
                fontWeight: timeframe === 'monthly' ? 600 : 400,
              }}
            >
              Month
            </Button>
            <Button 
              onClick={() => setTimeframe('yearly')}
              sx={{ 
                borderColor: timeframe === 'yearly' ? theme.palette[color].main : undefined,
                color: timeframe === 'yearly' ? theme.palette[color].main : undefined,
                fontWeight: timeframe === 'yearly' ? 600 : 400,
              }}
            >
              Year
            </Button>
          </ButtonGroup>
        </Box>
        
        {/* Chart */}
        <Box sx={{ height: 300, width: '100%', mt: 1 }}>
          <ResponsiveContainer width="100%" height="100%">
            <RechartsAreaChart
              data={filteredData}
              margin={{
                top: 10,
                right: 5,
                left: 0,
                bottom: 0,
              }}
            >
              <defs>
                <linearGradient id={`color${color}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={theme.palette[color].main} stopOpacity={0.8}/>
                  <stop offset="95%" stopColor={theme.palette[color].main} stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke={theme.palette.divider} />
              <XAxis 
                dataKey={xAxisKey} 
                tickLine={false}
                axisLine={{ stroke: theme.palette.divider }}
                tick={{ fill: theme.palette.text.secondary, fontSize: 12 }}
              />
              <YAxis 
                tickLine={false}
                axisLine={{ stroke: theme.palette.divider }}
                tick={{ fill: theme.palette.text.secondary, fontSize: 12 }}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: theme.palette.background.paper,
                  borderColor: theme.palette.divider,
                  borderRadius: 8,
                  boxShadow: theme.shadows[3],
                  color: theme.palette.text.primary,
                }}
              />
              <Area 
                type="monotone" 
                dataKey={dataKey} 
                stroke={theme.palette[color].main} 
                fillOpacity={1} 
                fill={`url(#color${color})`} 
              />
            </RechartsAreaChart>
          </ResponsiveContainer>
        </Box>
      </CardContent>
    </Card>
  );
};

export default AreaChart; 