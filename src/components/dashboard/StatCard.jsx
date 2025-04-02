import { Card, CardContent, Typography, Box, Avatar, useTheme } from '@mui/material';

const StatCard = ({ title, value, icon, trend, trendValue, color = 'primary' }) => {
  const theme = useTheme();
  
  // Determine trend color based on positive or negative value
  const trendColor = trendValue > 0 ? theme.palette.success.main : theme.palette.error.main;

  return (
    <Card 
      elevation={0}
      sx={{ 
        height: '100%',
        borderRadius: 2,
        transition: 'transform 0.3s, box-shadow 0.3s',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: 3,
        }
      }}
    >
      <CardContent sx={{ padding: 3 }}>
        {/* Card header with icon */}
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Avatar 
            sx={{ 
              bgcolor: theme.palette[color].main + '20', 
              color: theme.palette[color].main,
              mr: 2 
            }}
          >
            {icon}
          </Avatar>
          <Typography 
            variant="h6" 
            color="textSecondary" 
            sx={{ fontWeight: 500 }}
          >
            {title}
          </Typography>
        </Box>
        
        {/* Value */}
        <Typography 
          variant="h4" 
          sx={{ 
            mb: 1, 
            fontWeight: 600,
            color: theme.palette.text.primary 
          }}
        >
          {value}
        </Typography>
        
        {/* Trend */}
        {trend && (
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography 
              variant="body2" 
              sx={{ 
                fontWeight: 500,
                color: trendColor,
                mr: 1
              }}
            >
              {trendValue > 0 ? '+' : ''}{trendValue}%
            </Typography>
            <Typography variant="body2" color="textSecondary">
              {trend}
            </Typography>
          </Box>
        )}
      </CardContent>
    </Card>
  );
};

export default StatCard; 