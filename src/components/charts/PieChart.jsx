import { useState } from 'react';
import { Card, CardContent, Typography, Box, useTheme } from '@mui/material';
import { PieChart as RechartsPieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

// Eenvoudige taartdiagram component
const PieChart = ({ title, data }) => {
  const theme = useTheme();
  
  // Kleuren voor de secties
  const COLORS = [
    theme.palette.primary.main,
    theme.palette.secondary.main,
    theme.palette.error.main,
    theme.palette.warning.main,
    theme.palette.info.main,
    theme.palette.success.main,
  ];

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
            <RechartsPieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: theme.palette.background.paper,
                  borderColor: theme.palette.divider,
                  color: theme.palette.mode === 'dark' ? '#ffffff' : theme.palette.text.primary,
                }}
              />
              <Legend />
            </RechartsPieChart>
          </ResponsiveContainer>
        </Box>
      </CardContent>
    </Card>
  );
};

export default PieChart; 