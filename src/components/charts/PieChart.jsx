import { Card, CardContent, Typography, Box, useTheme } from '@mui/material';
import { PieChart as RechartsPieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
  const RADIAN = Math.PI / 180;
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

const PieChart = ({ title, data, dataKey = 'value', nameKey = 'name' }) => {
  const theme = useTheme();
  
  // Custom colors for pie chart sections
  const COLORS = [
    theme.palette.primary.main,
    theme.palette.secondary.main,
    theme.palette.warning.main,
    theme.palette.error.main,
    theme.palette.success.main,
    theme.palette.primary.light,
    theme.palette.secondary.light,
    theme.palette.warning.light,
  ];

  return (
    <Card
      elevation={0}
      sx={{
        height: '100%',
        borderRadius: 2,
      }}
    >
      <CardContent sx={{ padding: 3, height: '100%' }}>
        {/* Chart header with title */}
        <Typography variant="h6" color="textPrimary" sx={{ fontWeight: 600, mb: 2 }}>
          {title}
        </Typography>
        
        {/* Chart */}
        <Box sx={{ height: 300, width: '100%' }}>
          <ResponsiveContainer width="100%" height="100%">
            <RechartsPieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={renderCustomizedLabel}
                outerRadius={90}
                dataKey={dataKey}
                nameKey={nameKey}
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: theme.palette.background.paper,
                  borderColor: theme.palette.divider,
                  borderRadius: 8,
                  boxShadow: theme.shadows[3],
                  color: theme.palette.text.primary,
                }}
                formatter={(value) => [`$${value}`, '']}
              />
              <Legend 
                layout="horizontal" 
                verticalAlign="bottom" 
                align="center"
                formatter={(value, entry, index) => (
                  <span style={{ color: theme.palette.text.primary }}>
                    {value}
                  </span>
                )}
              />
            </RechartsPieChart>
          </ResponsiveContainer>
        </Box>
      </CardContent>
    </Card>
  );
};

export default PieChart; 