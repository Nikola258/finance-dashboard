import { useParams, useNavigate } from 'react-router-dom';
import { Box, Button, useTheme } from '@mui/material';
import { ArrowBack } from '@mui/icons-material';
import CoinDetails from '../components/crypto/CoinDetails';

const CoinDetailsPage = () => {
  const theme = useTheme();
  const { coinId } = useParams();
  const navigate = useNavigate();
  
  return (
    <Box>
      {/* Back button */}
      <Button 
        startIcon={<ArrowBack />}
        onClick={() => navigate(-1)}
        sx={{ 
          mb: 3,
          color: theme.palette.text.primary,
          '&:hover': {
            backgroundColor: theme.palette.action.hover,
          }
        }}
      >
        Back to Dashboard
      </Button>
      
      {/* Coin details component */}
      <CoinDetails coinId={coinId} />
    </Box>
  );
};

export default CoinDetailsPage; 