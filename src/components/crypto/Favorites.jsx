import { 
  Card, 
  CardContent, 
  Typography, 
  Box, 
  List, 
  ListItem, 
  ListItemAvatar, 
  ListItemText, 
  Avatar, 
  Divider, 
  useTheme, 
  IconButton,
  Chip
} from '@mui/material';
import { 
  Star, 
  TrendingUp, 
  TrendingDown, 
  NavigateNext 
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useCryptoContext } from '../../context/CryptoContext';

const Favorites = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const { favoriteCoins, toggleFavorite, loading, error } = useCryptoContext();
  
  // Format currency
  const formatCurrency = (num) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: num < 1 ? 4 : 2,
      maximumFractionDigits: num < 1 ? 6 : 2,
    }).format(num);
  };
  
  // Format percentage
  const formatPercentage = (num) => {
    return `${num.toFixed(2)}%`;
  };
  
  // If no favorites
  if (favoriteCoins.length === 0 && !loading && !error) {
    return (
      <Card
        elevation={0}
        sx={{
          height: '100%',
          borderRadius: 2,
        }}
      >
        <CardContent sx={{ padding: 3, height: '100%' }}>
          <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
            Favorites
          </Typography>
          <Box sx={{ 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center', 
            justifyContent: 'center',
            height: 'calc(100% - 40px)', 
            p: 3
          }}>
            <Star sx={{ fontSize: 48, color: theme.palette.warning.main, mb: 2, opacity: 0.7 }} />
            <Typography variant="body1" color="textSecondary" align="center">
              You haven't added any favorites yet. Click the star icon on any coin to add it to your favorites.
            </Typography>
          </Box>
        </CardContent>
      </Card>
    );
  }
  
  // If loading
  if (loading) {
    return (
      <Card
        elevation={0}
        sx={{
          height: '100%',
          borderRadius: 2,
        }}
      >
        <CardContent sx={{ padding: 3, height: '100%' }}>
          <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
            Favorites
          </Typography>
          <Box sx={{ p: 3, textAlign: 'center' }}>
            <Typography>Loading favorites...</Typography>
          </Box>
        </CardContent>
      </Card>
    );
  }
  
  // If error
  if (error) {
    return (
      <Card
        elevation={0}
        sx={{
          height: '100%',
          borderRadius: 2,
        }}
      >
        <CardContent sx={{ padding: 3, height: '100%' }}>
          <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
            Favorites
          </Typography>
          <Box sx={{ p: 3, textAlign: 'center' }}>
            <Typography color="error">{error}</Typography>
          </Box>
        </CardContent>
      </Card>
    );
  }
  
  return (
    <Card
      elevation={0}
      sx={{
        height: '100%',
        borderRadius: 2,
      }}
    >
      <CardContent sx={{ padding: 3, height: '100%' }}>
        <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
          Favorites
        </Typography>
        
        <List disablePadding>
          {favoriteCoins.map((coin, index) => (
            <Box key={coin.id}>
              <ListItem 
                disablePadding 
                sx={{ py: 1.5 }}
                secondaryAction={
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <IconButton 
                      edge="end" 
                      onClick={() => toggleFavorite(coin.id)}
                      color="warning"
                    >
                      <Star />
                    </IconButton>
                    <IconButton edge="end" onClick={() => navigate(`/coin/${coin.id}`)}>
                      <NavigateNext />
                    </IconButton>
                  </Box>
                }
              >
                <ListItemAvatar>
                  <Avatar src={coin.image} alt={coin.name} />
                </ListItemAvatar>
                <ListItemText
                  primary={
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Typography variant="body1" component="span" sx={{ fontWeight: 500 }}>
                        {coin.name}
                      </Typography>
                      <Typography 
                        variant="body2" 
                        component="span" 
                        sx={{ color: theme.palette.text.secondary, ml: 1 }}
                      >
                        {coin.symbol.toUpperCase()}
                      </Typography>
                    </Box>
                  }
                  secondary={
                    <Box sx={{ display: 'flex', alignItems: 'center', mt: 0.5 }}>
                      <Typography variant="body2" sx={{ fontWeight: 500 }}>
                        {formatCurrency(coin.current_price)}
                      </Typography>
                      <Chip 
                        size="small"
                        icon={coin.price_change_percentage_24h > 0 ? <TrendingUp fontSize="small" /> : <TrendingDown fontSize="small" />}
                        label={formatPercentage(coin.price_change_percentage_24h)}
                        sx={{ 
                          ml: 1,
                          bgcolor: coin.price_change_percentage_24h > 0 
                            ? theme.palette.success.main + '20'
                            : theme.palette.error.main + '20',
                          color: coin.price_change_percentage_24h > 0 
                            ? theme.palette.success.main
                            : theme.palette.error.main,
                          fontWeight: 500,
                          fontSize: '0.75rem',
                          height: 20,
                        }}
                      />
                    </Box>
                  }
                />
              </ListItem>
              {index < favoriteCoins.length - 1 && <Divider />}
            </Box>
          ))}
        </List>
      </CardContent>
    </Card>
  );
};

export default Favorites; 