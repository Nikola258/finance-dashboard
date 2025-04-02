import React from 'react';
import { Box, Typography, Card, CardContent, Grid, Switch, FormControlLabel, Button } from '@mui/material';
import { Notifications, Security, Palette, Language } from '@mui/icons-material';

const SettingsPage = () => {
  return (
    <Box className="page-container" sx={{ p: 3 }}>
      <Typography variant="h4" sx={{ mb: 4 }}>Settings</Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Card className="card hover-effect">
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Notifications sx={{ mr: 1 }} />
                <Typography variant="h6">Notifications</Typography>
              </Box>
              <FormControlLabel 
                control={<Switch defaultChecked />} 
                label="Email Notifications" 
              />
              <FormControlLabel 
                control={<Switch />} 
                label="Push Notifications" 
              />
              <FormControlLabel 
                control={<Switch defaultChecked />} 
                label="Transaction Alerts" 
              />
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card className="card hover-effect">
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Security sx={{ mr: 1 }} />
                <Typography variant="h6">Security</Typography>
              </Box>
              <FormControlLabel 
                control={<Switch defaultChecked />} 
                label="Two-Factor Authentication" 
              />
              <Button variant="outlined" color="primary" sx={{ mt: 2 }}>
                Change Password
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default SettingsPage; 