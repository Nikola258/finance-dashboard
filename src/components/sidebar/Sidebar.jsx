import { useState } from 'react';
import { 
  Box, 
  Drawer, 
  List, 
  ListItem, 
  ListItemButton, 
  ListItemIcon, 
  ListItemText, 
  IconButton, 
  Typography, 
  Divider, 
  useTheme, 
  useMediaQuery 
} from '@mui/material';
import { 
  Dashboard as DashboardIcon, 
  TrendingUp, 
  PieChart, 
  CreditCard, 
  Settings, 
  AccountBalanceWallet, 
  Menu as MenuIcon, 
  NightlightRound, 
  LightMode,
  ChevronLeft,
  MonetizationOn,
  Star
} from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';
import { useThemeContext } from '../../context/ThemeContext';

// Sidebar width
const drawerWidth = 240;

const Sidebar = () => {
  const theme = useTheme();
  const { mode, toggleTheme } = useThemeContext();
  const navigate = useNavigate();
  const location = useLocation();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  
  // State to control mobile drawer
  const [mobileOpen, setMobileOpen] = useState(false);

  // Toggle mobile drawer
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  // Menu items for navigation
  const menuItems = [
    { text: 'Crypto Dashboard', icon: <MonetizationOn />, path: '/' },
    { text: 'Classic Dashboard', icon: <DashboardIcon />, path: '/dashboard' },
    { text: 'Investments', icon: <TrendingUp />, path: '/investments' },
    { text: 'Expenses', icon: <PieChart />, path: '/expenses' },
    { text: 'Cards', icon: <CreditCard />, path: '/cards' },
    { text: 'Wallet', icon: <AccountBalanceWallet />, path: '/wallet' },
    { text: 'Settings', icon: <Settings />, path: '/settings' },
  ];

  // Drawer content
  const drawerContent = (
    <>
      <Box sx={{ display: 'flex', alignItems: 'center', px: 2, py: 2 }}>
        <Typography variant="h5" sx={{ fontWeight: 'bold', flexGrow: 1 }}>
          Finance Hub
        </Typography>
        {isMobile && (
          <IconButton onClick={handleDrawerToggle} sx={{ ml: 1 }}>
            <ChevronLeft />
          </IconButton>
        )}
      </Box>
      <Divider />
      <List>
        {menuItems.map((item) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton 
              onClick={() => {
                navigate(item.path);
                if (isMobile) setMobileOpen(false);
              }} 
              selected={
                item.path === '/' 
                  ? location.pathname === '/' || location.pathname.startsWith('/coin/')
                  : location.pathname === item.path
              }
              sx={{
                '&.Mui-selected': {
                  backgroundColor: theme.palette.primary.main + '20',
                  borderRight: `3px solid ${theme.palette.primary.main}`,
                  '&:hover': {
                    backgroundColor: theme.palette.primary.main + '30',
                  }
                },
                '&:hover': {
                  backgroundColor: theme.palette.primary.main + '10',
                }
              }}
            >
              <ListItemIcon sx={{ 
                color: (item.path === '/' 
                  ? location.pathname === '/' || location.pathname.startsWith('/coin/')
                  : location.pathname === item.path)
                  ? theme.palette.primary.main 
                  : theme.palette.text.secondary
              }}>
                {item.icon}
              </ListItemIcon>
              <ListItemText 
                primary={item.text} 
                sx={{ 
                  color: (item.path === '/' 
                    ? location.pathname === '/' || location.pathname.startsWith('/coin/')
                    : location.pathname === item.path)
                    ? theme.palette.primary.main 
                    : theme.palette.text.primary
                }}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Box sx={{ position: 'absolute', bottom: 16, left: 0, right: 0, display: 'flex', justifyContent: 'center' }}>
        <IconButton onClick={toggleTheme} sx={{ color: theme.palette.text.secondary }}>
          {mode === 'dark' ? <LightMode /> : <NightlightRound />}
        </IconButton>
      </Box>
    </>
  );

  return (
    <>
      {/* Mobile hamburger menu */}
      {isMobile && (
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={handleDrawerToggle}
          sx={{ 
            mr: 2, 
            display: { md: 'none' },
            position: 'absolute',
            top: 12,
            left: 12,
            zIndex: 1199
          }}
        >
          <MenuIcon />
        </IconButton>
      )}

      {/* Mobile drawer - temporary, closes on click outside */}
      {isMobile && (
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile
          }}
          sx={{
            display: { xs: 'block', md: 'none' },
            '& .MuiDrawer-paper': { 
              boxSizing: 'border-box', 
              width: drawerWidth,
              backgroundColor: theme.palette.background.paper,
            },
          }}
        >
          {drawerContent}
        </Drawer>
      )}

      {/* Desktop drawer - permanent, always shown */}
      {!isMobile && (
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', md: 'block' },
            '& .MuiDrawer-paper': { 
              boxSizing: 'border-box', 
              width: drawerWidth,
              backgroundColor: theme.palette.background.paper,
              borderRight: `1px solid ${theme.palette.divider}`
            },
          }}
          open
        >
          {drawerContent}
        </Drawer>
      )}
    </>
  );
};

export default Sidebar; 