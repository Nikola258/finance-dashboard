import { useState } from 'react';
import { 
  Paper, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  Typography, 
  Box, 
  Chip, 
  IconButton, 
  TablePagination,
  useTheme,
  Avatar,
  TextField,
  InputAdornment
} from '@mui/material';
import { 
  Search, 
  Star, 
  StarBorder,
  TrendingUp, 
  TrendingDown,
  ArrowUpward,
  ArrowDownward
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useCryptoContext } from '../../context/CryptoContext';

const CoinList = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const { 
    filteredCoins, 
    searchTerm, 
    setSearchTerm, 
    toggleFavorite, 
    isFavorite,
    loading,
    error
  } = useCryptoContext();
  
  // Pagination state
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  
  // Sorting state
  const [orderBy, setOrderBy] = useState('market_cap');
  const [order, setOrder] = useState('desc');
  
  // Handle page change
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  
  // Handle rows per page change
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  
  // Handle search input change
  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    setPage(0); // Reset to first page when searching
  };
  
  // Handle sort request
  const handleRequestSort = (property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };
  
  // Create sort handler
  const createSortHandler = (property) => () => {
    handleRequestSort(property);
  };
  
  // Function to sort data
  const sortedData = [...filteredCoins].sort((a, b) => {
    // Handle nested properties like price_change_percentage_24h
    let aValue = a[orderBy];
    let bValue = b[orderBy];
    
    // Return sorted data based on direction
    return (order === 'asc' ? 1 : -1) * (aValue < bValue ? -1 : aValue > bValue ? 1 : 0);
  });
  
  // Get current page data
  const currentPageData = sortedData.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );
  
  // Format large numbers with commas
  const formatNumber = (num) => {
    return num.toLocaleString();
  };
  
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
  
  // If loading
  if (loading) {
    return (
      <Box sx={{ p: 3, textAlign: 'center' }}>
        <Typography>Loading cryptocurrency data...</Typography>
      </Box>
    );
  }
  
  // If error
  if (error) {
    return (
      <Box sx={{ p: 3, textAlign: 'center' }}>
        <Typography color="error">{error}</Typography>
      </Box>
    );
  }
  
  return (
    <Box>
      {/* Search bar */}
      <Box sx={{ mb: 3 }}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Search cryptocurrency..."
          value={searchTerm}
          onChange={handleSearch}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search />
              </InputAdornment>
            ),
          }}
        />
      </Box>
      
      {/* Data table */}
      <TableContainer component={Paper} sx={{ borderRadius: 2, overflow: 'hidden' }}>
        <Table sx={{ minWidth: 650 }}>
          {/* Table header */}
          <TableHead sx={{ bgcolor: theme.palette.mode === 'dark' ? theme.palette.grey[800] : theme.palette.grey[100] }}>
            <TableRow>
              <TableCell sx={{ fontWeight: 'bold' }}>Favorite</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>
                <Box 
                  sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}
                  onClick={createSortHandler('market_cap_rank')}
                >
                  Rank
                  {orderBy === 'market_cap_rank' && (
                    order === 'asc' ? <ArrowUpward fontSize="small" /> : <ArrowDownward fontSize="small" />
                  )}
                </Box>
              </TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Name</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>
                <Box 
                  sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}
                  onClick={createSortHandler('current_price')}
                >
                  Price
                  {orderBy === 'current_price' && (
                    order === 'asc' ? <ArrowUpward fontSize="small" /> : <ArrowDownward fontSize="small" />
                  )}
                </Box>
              </TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>
                <Box 
                  sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}
                  onClick={createSortHandler('price_change_percentage_24h')}
                >
                  24h %
                  {orderBy === 'price_change_percentage_24h' && (
                    order === 'asc' ? <ArrowUpward fontSize="small" /> : <ArrowDownward fontSize="small" />
                  )}
                </Box>
              </TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>
                <Box 
                  sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}
                  onClick={createSortHandler('market_cap')}
                >
                  Market Cap
                  {orderBy === 'market_cap' && (
                    order === 'asc' ? <ArrowUpward fontSize="small" /> : <ArrowDownward fontSize="small" />
                  )}
                </Box>
              </TableCell>
            </TableRow>
          </TableHead>
          
          {/* Table body */}
          <TableBody>
            {currentPageData.map((coin) => (
              <TableRow 
                key={coin.id}
                hover
                onClick={() => navigate(`/coin/${coin.id}`)}
                sx={{ 
                  cursor: 'pointer',
                  '&:hover': {
                    bgcolor: theme.palette.action.hover
                  }
                }}
              >
                {/* Favorite toggle - stop propagation to prevent navigation */}
                <TableCell>
                  <IconButton 
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleFavorite(coin.id);
                    }}
                    color="warning"
                  >
                    {isFavorite(coin.id) ? <Star /> : <StarBorder />}
                  </IconButton>
                </TableCell>
                
                {/* Rank */}
                <TableCell>{coin.market_cap_rank}</TableCell>
                
                {/* Name with icon */}
                <TableCell>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Avatar 
                      src={coin.image} 
                      alt={coin.name}
                      sx={{ width: 24, height: 24, mr: 1 }}
                    />
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
                </TableCell>
                
                {/* Price */}
                <TableCell>{formatCurrency(coin.current_price)}</TableCell>
                
                {/* 24h change */}
                <TableCell>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    {coin.price_change_percentage_24h > 0 ? (
                      <TrendingUp sx={{ color: theme.palette.success.main, mr: 1 }} fontSize="small" />
                    ) : (
                      <TrendingDown sx={{ color: theme.palette.error.main, mr: 1 }} fontSize="small" />
                    )}
                    <Typography
                      variant="body2"
                      sx={{
                        color: coin.price_change_percentage_24h > 0 
                          ? theme.palette.success.main 
                          : theme.palette.error.main,
                        fontWeight: 500
                      }}
                    >
                      {formatPercentage(coin.price_change_percentage_24h)}
                    </Typography>
                  </Box>
                </TableCell>
                
                {/* Market cap */}
                <TableCell>{formatCurrency(coin.market_cap)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        
        {/* Pagination */}
        <TablePagination
          rowsPerPageOptions={[5, 10, 25, 50]}
          component="div"
          count={filteredCoins.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </TableContainer>
    </Box>
  );
};

export default CoinList; 