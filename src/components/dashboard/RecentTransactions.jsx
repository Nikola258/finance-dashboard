import { useState } from 'react';
import { 
  Card, 
  CardContent, 
  Typography, 
  Box, 
  List, 
  ListItem, 
  ListItemText, 
  Chip, 
  Avatar, 
  IconButton, 
  Button,
  Divider,
  useTheme,
} from '@mui/material';
import { MoreVert, ArrowUpward, ArrowDownward, ShoppingBag, Restaurant, LocalGasStation, Home, Layers } from '@mui/icons-material';

// Transaction category to icon mapping
const categoryIcons = {
  shopping: <ShoppingBag fontSize="small" />,
  food: <Restaurant fontSize="small" />,
  transport: <LocalGasStation fontSize="small" />,
  housing: <Home fontSize="small" />,
  other: <Layers fontSize="small" />,
};

const RecentTransactions = ({ transactions }) => {
  const theme = useTheme();
  const [visibleItems, setVisibleItems] = useState(5);
  
  // Function to load more items
  const loadMore = () => {
    setVisibleItems((prevItems) => Math.min(prevItems + 5, transactions.length));
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
        {/* Card header */}
        <Typography variant="h6" color="textPrimary" sx={{ fontWeight: 600, mb: 2 }}>
          Recent Transactions
        </Typography>
        
        {/* Transactions list */}
        <List disablePadding>
          {transactions.slice(0, visibleItems).map((transaction, index) => (
            <Box key={transaction.id}>
              <ListItem 
                disablePadding 
                sx={{ 
                  py: 1.5,
                  px: 0, 
                  display: 'flex', 
                  alignItems: 'center' 
                }}
              >
                {/* Category icon */}
                <Avatar 
                  sx={{ 
                    bgcolor: theme.palette.mode === 'dark' 
                      ? theme.palette.grey[800] 
                      : theme.palette.grey[200],
                    color: transaction.type === 'expense' 
                      ? theme.palette.error.main 
                      : theme.palette.success.main,
                    mr: 2,
                    width: 40,
                    height: 40
                  }}
                >
                  {transaction.type === 'expense' 
                    ? <ArrowDownward fontSize="small" />
                    : <ArrowUpward fontSize="small" />
                  }
                </Avatar>
                
                {/* Transaction details */}
                <ListItemText
                  primary={transaction.title}
                  secondary={transaction.date}
                  primaryTypographyProps={{
                    fontWeight: 500,
                    variant: 'body1',
                    color: theme.palette.text.primary,
                  }}
                  secondaryTypographyProps={{
                    variant: 'body2',
                    color: theme.palette.text.secondary,
                  }}
                />
                
                {/* Category tag */}
                <Chip
                  size="small"
                  label={transaction.category}
                  icon={categoryIcons[transaction.category.toLowerCase()]}
                  sx={{ 
                    mr: 2,
                    bgcolor: theme.palette.mode === 'dark' 
                      ? theme.palette.grey[800] 
                      : theme.palette.grey[200],
                  }}
                />
                
                {/* Amount */}
                <Typography 
                  variant="body1" 
                  sx={{ 
                    fontWeight: 600,
                    color: transaction.type === 'expense' 
                      ? theme.palette.error.main 
                      : theme.palette.success.main,
                    ml: 'auto',
                  }}
                >
                  {transaction.type === 'expense' ? '-' : '+'}${transaction.amount}
                </Typography>
                
                {/* More actions */}
                <IconButton size="small" sx={{ ml: 1 }}>
                  <MoreVert fontSize="small" />
                </IconButton>
              </ListItem>
              
              {/* Add divider except for the last item */}
              {index < visibleItems - 1 && <Divider />}
            </Box>
          ))}
        </List>
        
        {/* Load more button */}
        {visibleItems < transactions.length && (
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
            <Button 
              variant="text" 
              onClick={loadMore}
              sx={{ 
                color: theme.palette.primary.main,
                '&:hover': {
                  backgroundColor: theme.palette.primary.main + '10',
                }
              }}
            >
              View More
            </Button>
          </Box>
        )}
      </CardContent>
    </Card>
  );
};

export default RecentTransactions; 