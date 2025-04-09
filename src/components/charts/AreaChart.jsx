import { useState } from 'react';
import { Card, CardContent, Typography, Box, useTheme } from '@mui/material';
import { AreaChart as RechartsAreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// Eenvoudige grafiek component
const AreaChart = ({ title, data, dataKey = 'value', xAxisKey = 'date', color = 'primary' }) => {
  const theme = useTheme();
  
  // Datum formatteren
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('nl-NL', { 
      day: 'numeric',
      month: 'short'
    });
  };
  
  return (
    <Card elevation={0} sx={{ height: '100%', borderRadius: 2 }}>
      <CardContent sx={{ padding: 3, height: '100%' }}>
        {/* Titel */}
        <Typography variant="h6" color="textPrimary" sx={{ fontWeight: 600, mb: 3 }}>
          {title}
        </Typography>
        
        {/* Grafiek */}
        <Box sx={{ height: 300, width: '100%' }}>
          <ResponsiveContainer width="100%" height="100%">
            <RechartsAreaChart data={data}>
              <defs>
                <linearGradient id={`color${color}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={theme.palette[color].main} stopOpacity={0.8}/>
                  <stop offset="95%" stopColor={theme.palette[color].main} stopOpacity={0}/>
                </linearGradient>
              </defs>
              
              <CartesianGrid strokeDasharray="3 3" stroke={theme.palette.divider} />
              
              <XAxis 
                dataKey={xAxisKey} 
                tickFormatter={formatDate}
                tick={{ fill: theme.palette.text.secondary }}
              />
              
              <YAxis 
                tick={{ fill: theme.palette.text.secondary }}
              />
              
              <Tooltip
                contentStyle={{
                  backgroundColor: theme.palette.background.paper,
                  borderColor: theme.palette.divider,
                  color: theme.palette.mode === 'dark' ? '#ffffff' : theme.palette.text.primary,
                }}
              />
              
              <Area 
                type="monotone" 
                dataKey={dataKey} 
                stroke={theme.palette[color].main} 
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