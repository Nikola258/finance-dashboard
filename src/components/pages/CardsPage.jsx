import React from 'react';
import { Box, Typography, Card, CardContent, Grid, Button } from '@mui/material';
import { CreditCard, AddCircle } from '@mui/icons-material';

const CardsPage = () => {
  const cards = [
    {
      type: 'VISA',
      number: '**** **** **** 1234',
      holder: 'John Doe',
      expiry: '12/24',
      gradient: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)'
    },
    {
      type: 'MASTERCARD',
      number: '**** **** **** 5678',
      holder: 'John Doe',
      expiry: '10/25',
      gradient: 'linear-gradient(45deg, #FF4081 30%, #FF80AB 90%)'
    }
  ];

  return (
    <Box className="page-container" sx={{ p: 3 }}>
      <Typography variant="h4" sx={{ mb: 4 }}>My Cards</Typography>
      <Grid container spacing={3}>
        {cards.map((card, index) => (
          <Grid item xs={12} md={6} key={index}>
            <Card 
              className="card hover-effect" 
              sx={{ 
                background: card.gradient,
                color: 'white'
              }}
            >
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                  <CreditCard />
                  <Typography>{card.type}</Typography>
                </Box>
                <Typography variant="h5">{card.number}</Typography>
                <Box sx={{ mt: 4, display: 'flex', justifyContent: 'space-between' }}>
                  <Typography>{card.holder}</Typography>
                  <Typography>{card.expiry}</Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
        <Grid item xs={12}>
          <Button 
            variant="contained" 
            startIcon={<AddCircle />}
            sx={{ mt: 2 }}
          >
            Add New Card
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default CardsPage; 