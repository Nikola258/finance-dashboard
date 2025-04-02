import React from 'react';
import { Grid, Card, CardContent, Box, Typography } from '@mui/material';
import { TrendingUp, TrendingDown } from '@mui/icons-material';

const InvestmentOverview = ({ portfolioStats }) => {
  return (
    <Grid container spacing={3}>
      {portfolioStats.map((stat, index) => (
        <Grid item xs={12} md={4} key={index}>
          <Card className="card hover-effect">
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="h6">{stat.title}</Typography>
                {stat.isPositive ? 
                  <TrendingUp color="success" /> : 
                  <TrendingDown color="error" />
                }
              </Box>
              <Typography variant="h4" sx={{ my: 2 }}>{stat.value}</Typography>
              <Typography 
                variant="body2" 
                color={stat.isPositive ? 'success.main' : 'error.main'}
              >
                {stat.change} this month
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default InvestmentOverview; 