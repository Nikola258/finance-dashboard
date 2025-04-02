import { useState, useEffect } from 'react';
import { 
  Card, 
  CardContent, 
  Typography, 
  Box, 
  Grid, 
  Avatar, 
  Chip, 
  Divider, 
  IconButton, 
  Link,
  CircularProgress,
  useTheme,
  Paper,
  List,
  ListItem,
  ListItemText
} from '@mui/material';
import { 
  Star, 
  StarBorder, 
  TrendingUp, 
  TrendingDown, 
  Link as LinkIcon,
  GitHub,
  Reddit,
  Twitter,
  Facebook
} from '@mui/icons-material';
import axios from 'axios';
import { useCryptoContext } from '../../context/CryptoContext';
import PriceChart from './PriceChart';

const CoinDetails = ({ coinId }) => {
  const theme = useTheme();
  const { isFavorite, toggleFavorite } = useCryptoContext();
  const [coinData, setCoinData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Fetch coin data
  useEffect(() => {
    const fetchCoinDetails = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const response = await axios.get(
          `https://api.coingecko.com/api/v3/coins/${coinId}`,
          {
            params: {
              localization: false,
              tickers: false,
              market_data: true,
              community_data: true,
              developer_data: true,
              sparkline: false
            }
          }
        );
        
        setCoinData(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching coin details:', error);
        setError('Failed to load coin details. Please try again later.');
        setLoading(false);
      }
    };
    
    if (coinId) {
      fetchCoinDetails();
    }
  }, [coinId]);
  
  // Format large numbers with commas
  const formatNumber = (num) => {
    return num ? num.toLocaleString() : 'N/A';
  };
  
  // Format currency
  const formatCurrency = (num) => {
    if (!num) return 'N/A';
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: num < 1 ? 4 : 2,
      maximumFractionDigits: num < 1 ? 6 : 2,
    }).format(num);
  };
  
  // Format percentage
  const formatPercentage = (num) => {
    return num ? `${num.toFixed(2)}%` : 'N/A';
  };
  
  // If loading
  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 400 }}>
        <CircularProgress size={40} />
      </Box>
    );
  }
  
  // If error
  if (error) {
    return (
      <Box sx={{ p: 3, textAlign: 'center', minHeight: 400 }}>
        <Typography color="error">{error}</Typography>
      </Box>
    );
  }
  
  // If no data
  if (!coinData) {
    return (
      <Box sx={{ p: 3, textAlign: 'center', minHeight: 400 }}>
        <Typography>No data available for this coin.</Typography>
      </Box>
    );
  }
  
  // Destructuring data for easier access
  const {
    name,
    symbol,
    image,
    market_data: {
      current_price,
      price_change_percentage_24h,
      market_cap,
      total_volume,
      high_24h,
      low_24h,
      circulating_supply,
      total_supply,
      max_supply,
      ath,
      ath_change_percentage,
      ath_date,
      atl,
      atl_change_percentage,
      atl_date,
    },
    market_cap_rank,
    description,
    links,
    categories,
    sentiment_votes_up_percentage,
    sentiment_votes_down_percentage,
    community_data,
    developer_data
  } = coinData;
  
  return (
    <Box>
      {/* Coin header */}
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
        <Avatar 
          src={image.large} 
          alt={name}
          sx={{ width: 64, height: 64, mr: 2 }}
        />
        <Box sx={{ flexGrow: 1 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}>
            <Typography variant="h4" component="h1" sx={{ fontWeight: 600, mr: 1 }}>
              {name}
            </Typography>
            <Typography 
              variant="h6" 
              component="span" 
              sx={{ 
                color: theme.palette.text.secondary,
                textTransform: 'uppercase',
                mr: 1
              }}
            >
              {symbol}
            </Typography>
            <Chip 
              label={`Rank #${market_cap_rank}`}
              size="small"
              sx={{ 
                bgcolor: theme.palette.primary.main + '20',
                color: theme.palette.primary.main,
                fontWeight: 500
              }}
            />
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography variant="h5" sx={{ fontWeight: 600, mr: 2 }}>
              {formatCurrency(current_price.usd)}
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              {price_change_percentage_24h > 0 ? (
                <TrendingUp sx={{ color: theme.palette.success.main, mr: 0.5 }} />
              ) : (
                <TrendingDown sx={{ color: theme.palette.error.main, mr: 0.5 }} />
              )}
              <Typography
                variant="body1"
                sx={{
                  color: price_change_percentage_24h > 0 
                    ? theme.palette.success.main 
                    : theme.palette.error.main,
                  fontWeight: 500
                }}
              >
                {formatPercentage(price_change_percentage_24h)}
              </Typography>
            </Box>
            <IconButton 
              onClick={() => toggleFavorite(coinId)}
              color="warning"
              sx={{ ml: 'auto' }}
            >
              {isFavorite(coinId) ? <Star /> : <StarBorder />}
            </IconButton>
          </Box>
        </Box>
      </Box>
      
      {/* Price chart */}
      <Box sx={{ mb: 4 }}>
        <PriceChart coinId={coinId} coinName={name} />
      </Box>
      
      {/* Market stats */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} md={6}>
          <Card elevation={0} sx={{ borderRadius: 2 }}>
            <CardContent sx={{ p: 3 }}>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                Market Stats
              </Typography>
              
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Typography variant="body2" color="textSecondary">
                    Market Cap
                  </Typography>
                  <Typography variant="body1" sx={{ fontWeight: 500 }}>
                    {formatCurrency(market_cap.usd)}
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body2" color="textSecondary">
                    24h Volume
                  </Typography>
                  <Typography variant="body1" sx={{ fontWeight: 500 }}>
                    {formatCurrency(total_volume.usd)}
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body2" color="textSecondary">
                    24h High
                  </Typography>
                  <Typography variant="body1" sx={{ fontWeight: 500 }}>
                    {formatCurrency(high_24h.usd)}
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body2" color="textSecondary">
                    24h Low
                  </Typography>
                  <Typography variant="body1" sx={{ fontWeight: 500 }}>
                    {formatCurrency(low_24h.usd)}
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body2" color="textSecondary">
                    Circulating Supply
                  </Typography>
                  <Typography variant="body1" sx={{ fontWeight: 500 }}>
                    {formatNumber(circulating_supply)} {symbol.toUpperCase()}
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body2" color="textSecondary">
                    Total Supply
                  </Typography>
                  <Typography variant="body1" sx={{ fontWeight: 500 }}>
                    {formatNumber(total_supply)} {symbol.toUpperCase()}
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body2" color="textSecondary">
                    Max Supply
                  </Typography>
                  <Typography variant="body1" sx={{ fontWeight: 500 }}>
                    {max_supply ? `${formatNumber(max_supply)} ${symbol.toUpperCase()}` : 'Unlimited'}
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Divider sx={{ my: 1 }} />
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body2" color="textSecondary">
                    All Time High
                  </Typography>
                  <Typography variant="body1" sx={{ fontWeight: 500 }}>
                    {formatCurrency(ath.usd)}
                  </Typography>
                  <Typography variant="body2" sx={{ 
                    color: ath_change_percentage.usd > 0 
                      ? theme.palette.success.main 
                      : theme.palette.error.main,
                  }}>
                    {formatPercentage(ath_change_percentage.usd)}
                  </Typography>
                  <Typography variant="caption" color="textSecondary">
                    {new Date(ath_date.usd).toLocaleDateString()}
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body2" color="textSecondary">
                    All Time Low
                  </Typography>
                  <Typography variant="body1" sx={{ fontWeight: 500 }}>
                    {formatCurrency(atl.usd)}
                  </Typography>
                  <Typography variant="body2" sx={{ 
                    color: atl_change_percentage.usd > 0 
                      ? theme.palette.success.main 
                      : theme.palette.error.main,
                  }}>
                    {formatPercentage(atl_change_percentage.usd)}
                  </Typography>
                  <Typography variant="caption" color="textSecondary">
                    {new Date(atl_date.usd).toLocaleDateString()}
                  </Typography>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} md={6}>
          <Card elevation={0} sx={{ borderRadius: 2 }}>
            <CardContent sx={{ p: 3 }}>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                Info & Social
              </Typography>
              
              {/* Categories */}
              <Typography variant="body2" color="textSecondary" sx={{ mb: 1 }}>
                Categories
              </Typography>
              <Box sx={{ mb: 2, display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                {categories && categories.map((category, index) => (
                  <Chip 
                    key={index}
                    label={category}
                    size="small"
                    sx={{ 
                      bgcolor: theme.palette.primary.main + '10',
                      color: theme.palette.text.primary
                    }}
                  />
                ))}
              </Box>
              
              {/* Links */}
              <Typography variant="body2" color="textSecondary" sx={{ mb: 1 }}>
                Links
              </Typography>
              <Box sx={{ mb: 2 }}>
                {links.homepage[0] && (
                  <Link 
                    href={links.homepage[0]} 
                    target="_blank"
                    rel="noopener noreferrer"
                    sx={{ display: 'flex', alignItems: 'center', mb: 1 }}
                  >
                    <LinkIcon fontSize="small" sx={{ mr: 1 }} /> Official Website
                  </Link>
                )}
                {links.blockchain_site && links.blockchain_site[0] && (
                  <Link 
                    href={links.blockchain_site[0]} 
                    target="_blank"
                    rel="noopener noreferrer"
                    sx={{ display: 'flex', alignItems: 'center', mb: 1 }}
                  >
                    <LinkIcon fontSize="small" sx={{ mr: 1 }} /> Explorer
                  </Link>
                )}
                
                {/* Social media links */}
                <Box sx={{ display: 'flex', gap: 1, mt: 2 }}>
                  {links.subreddit_url && (
                    <IconButton 
                      href={links.subreddit_url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      size="small"
                    >
                      <Reddit />
                    </IconButton>
                  )}
                  {links.twitter_screen_name && (
                    <IconButton 
                      href={`https://twitter.com/${links.twitter_screen_name}`} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      size="small"
                    >
                      <Twitter />
                    </IconButton>
                  )}
                  {links.facebook_username && (
                    <IconButton 
                      href={`https://facebook.com/${links.facebook_username}`} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      size="small"
                    >
                      <Facebook />
                    </IconButton>
                  )}
                  {links.repos_url.github && links.repos_url.github.length > 0 && (
                    <IconButton 
                      href={links.repos_url.github[0]} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      size="small"
                    >
                      <GitHub />
                    </IconButton>
                  )}
                </Box>
              </Box>
              
              {/* Community stats */}
              <Typography variant="body2" color="textSecondary" sx={{ mb: 1 }}>
                Community Stats
              </Typography>
              <Box sx={{ mb: 2 }}>
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <Typography variant="body2" color="textSecondary">
                      Reddit Subscribers
                    </Typography>
                    <Typography variant="body1" sx={{ fontWeight: 500 }}>
                      {formatNumber(community_data.reddit_subscribers)}
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="body2" color="textSecondary">
                      Twitter Followers
                    </Typography>
                    <Typography variant="body1" sx={{ fontWeight: 500 }}>
                      {formatNumber(community_data.twitter_followers)}
                    </Typography>
                  </Grid>
                </Grid>
              </Box>
              
              {/* Developer stats */}
              <Typography variant="body2" color="textSecondary" sx={{ mb: 1 }}>
                Developer Stats
              </Typography>
              <Box>
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <Typography variant="body2" color="textSecondary">
                      GitHub Stars
                    </Typography>
                    <Typography variant="body1" sx={{ fontWeight: 500 }}>
                      {formatNumber(developer_data.stars)}
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="body2" color="textSecondary">
                      GitHub Forks
                    </Typography>
                    <Typography variant="body1" sx={{ fontWeight: 500 }}>
                      {formatNumber(developer_data.forks)}
                    </Typography>
                  </Grid>
                </Grid>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      
      {/* Description */}
      {description.en && (
        <Card elevation={0} sx={{ borderRadius: 2, mb: 4 }}>
          <CardContent sx={{ p: 3 }}>
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
              About {name}
            </Typography>
            <Typography 
              variant="body2" 
              component="div" 
              sx={{ 
                '& a': { 
                  color: theme.palette.primary.main,
                  textDecoration: 'none'
                } 
              }}
              dangerouslySetInnerHTML={{ __html: description.en }}
            />
          </CardContent>
        </Card>
      )}
    </Box>
  );
};

export default CoinDetails; 