import { Card, CardContent, Typography, Box, useTheme } from '@mui/material';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { useCryptoContext } from '../../context/CryptoContext';

// Dit is een grafiek die laat zien hoeveel procent van de markt elke cryptocurrency heeft
const MarketShareChart = () => {
  // Haal het thema op (licht of donker)
  const theme = useTheme();
  
  // Haal data op van de crypto context
  const { topCoins, loading, error } = useCryptoContext();
  
  // Laat een bericht zien als de data nog aan het laden is
  if (loading) {
    return (
      <Box sx={{ p: 3, textAlign: 'center' }}>
        <Typography>Loading market share data...</Typography>
      </Box>
    );
  }
  
  // Laat een foutmelding zien als er iets mis is gegaan
  if (error) {
    return (
      <Box sx={{ p: 3, textAlign: 'center' }}>
        <Typography color="error">{error}</Typography>
      </Box>
    );
  }
  
  // Maak de data klaar voor de grafiek
  const marketShareData = topCoins.map(coin => ({
    name: coin.symbol.toUpperCase(),
    value: coin.market_cap,
    color: generateColorFromString(coin.id),
    fullName: coin.name
  }));
  
  // Kleuren voor de taartstukjes
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
  
  // Maak een kleur op basis van een woord (zodat elke cryptocurrency altijd dezelfde kleur heeft)
  function generateColorFromString(str) {
    // Maak een getal van het woord
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    
    // Maak een kleur van het getal
    let color = '#';
    for (let i = 0; i < 3; i++) {
      const value = (hash >> (i * 8)) & 0xFF;
      color += ('00' + value.toString(16)).substr(-2);
    }
    return color;
  }
  
  // Custom tooltip component for better visibility
  const CustomTooltip = ({ active, payload, label }) => {
    const theme = useTheme();
    
    if (!active || !payload || !payload.length) return null;
    
    const coin = payload[0].payload;
    return (
      <Box
        sx={{
          backgroundColor: theme.palette.background.paper,
          border: `1px solid ${theme.palette.divider}`,
          borderRadius: 2,
          p: 1.5,
          boxShadow: theme.shadows[3],
        }}
      >
        <Typography variant="body2" sx={{ color: theme.palette.text.primary, fontWeight: 500 }}>
          {coin.fullName} ({coin.name})
        </Typography>
        <Typography variant="body2" sx={{ color: theme.palette.text.primary, mt: 0.5 }}>
          ${(coin.value / 1000000000).toFixed(2)}B
        </Typography>
      </Box>
    );
  };
  
  // Maak de uitleg onderaan mooi
  const legendFormatter = (value, entry, index) => {
    return (
      <span style={{ color: theme.palette.text.primary, marginRight: 10 }}>
        {`${value}`}
      </span>
    );
  };
  
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
        <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
          Market Share (Top 10)
        </Typography>
        
        {/* De grafiek zelf */}
        <Box sx={{ height: 300, width: '100%' }}>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              {/* De taartgrafiek */}
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
                {/* Maak een stukje voor elk datapunt met een andere kleur */}
                {marketShareData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              
              {/* Info die verschijnt als je over de taart hovert */}
              <Tooltip 
                content={<CustomTooltip />}
              />
              
              {/* Uitleg aan de zijkant die laat zien wat elk stukje betekent */}
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