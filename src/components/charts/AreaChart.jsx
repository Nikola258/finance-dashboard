import { Card, CardContent, Typography, Box, useTheme } from '@mui/material';
import { AreaChart as RechartsAreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// Dit is een grafiek die data laat zien als een vloeiende lijn
const AreaChart = ({ title, data, dataKey = 'value', xAxisKey = 'date', color = 'primary' }) => {
  // Haal het thema op (licht of donker)
  const theme = useTheme();
  
  return (
    // De kaart waarin de grafiek zit
    <Card
      elevation={0}
      sx={{
        height: '100%',
        borderRadius: 2,
        overflow: 'visible',
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
            <RechartsAreaChart
              data={data}
              margin={{
                top: 10,
                right: 30,
                left: 10,
                bottom: 35,
              }}
            >
              {/* Maak een mooie kleurovergang voor de grafiek */}
              <defs>
                <linearGradient id={`color${color}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={theme.palette[color].main} stopOpacity={0.8}/>
                  <stop offset="95%" stopColor={theme.palette[color].main} stopOpacity={0}/>
                </linearGradient>
              </defs>
              
              {/* Lijnen in de achtergrond */}
              <CartesianGrid strokeDasharray="3 3" stroke={theme.palette.divider} />
              
              {/* As onderaan (horizontaal) */}
              <XAxis 
                dataKey={xAxisKey} 
                tickLine={false}
                axisLine={{ stroke: theme.palette.divider }}
                tick={{ 
                  fill: theme.palette.text.secondary, 
                  fontSize: 11,
                  angle: 0,
                  textAnchor: 'middle',
                  dy: 10
                }}
                interval="preserveStartEnd"
                minTickGap={30}
                height={40}
                tickFormatter={(value) => {
                  const date = new Date(value);
                  return `${date.getDate()}/${date.getMonth() + 1}`;
                }}
              />
              
              {/* As aan de zijkant (verticaal) */}
              <YAxis 
                tickLine={false}
                axisLine={{ stroke: theme.palette.divider }}
                tick={{ fill: theme.palette.text.secondary, fontSize: 12 }}
              />
              
              {/* Info die verschijnt als je over de grafiek hovert */}
              <Tooltip
                contentStyle={{
                  backgroundColor: theme.palette.background.paper,
                  borderColor: theme.palette.divider,
                  borderRadius: 8,
                  boxShadow: theme.shadows[3],
                  color: theme.palette.mode === 'dark' ? '#ffffff' : theme.palette.text.primary,
                }}
              />
              
              {/* De gekleurde vlak onder de lijn */}
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