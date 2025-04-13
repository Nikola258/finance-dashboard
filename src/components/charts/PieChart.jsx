import { Card, CardContent, Typography, Box, useTheme } from '@mui/material';
import { PieChart as RechartsPieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

// Dit is een grafiek die data laat zien als een taart
const PieChart = ({ title, data, dataKey = 'value', nameKey = 'name' }) => {
  // Haal het thema op (licht of donker)
  const theme = useTheme();
  
  // Kleuren voor de taartstukjes
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
    // De kaart waarin de grafiek zit
    <Card
      elevation={0}
      sx={{
        height: '100%',
        borderRadius: 2,
      }}
    >
      <CardContent sx={{ padding: 3, height: '100%' }}>
        {/* Titel van de grafiek */}
        <Typography variant="h6" color="textPrimary" sx={{ fontWeight: 600, mb: 2 }}>
          {title}
        </Typography>
        
        {/* De grafiek zelf */}
        <Box sx={{ height: 300, width: '100%' }}>
          <ResponsiveContainer width="100%" height="100%">
            <RechartsPieChart>
              {/* De taartgrafiek */}
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={90}
                dataKey={dataKey}
                nameKey={nameKey}
              >
                {/* Maak een stukje voor elk datapunt met een andere kleur */}
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              
              {/* Info die verschijnt als je over de taart hovert */}
              <Tooltip
                contentStyle={{
                  backgroundColor: theme.palette.background.paper,
                  borderColor: theme.palette.divider,
                  borderRadius: 8,
                  boxShadow: theme.shadows[3],
                  color: theme.palette.mode === 'dark' ? '#ffffff' : theme.palette.text.primary,
                }}
                formatter={(value) => [`$${value}`, '']}
              />
              
              {/* Uitleg onderaan die laat zien wat elk stukje betekent */}
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