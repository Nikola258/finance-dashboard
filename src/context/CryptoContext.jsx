import { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';

// Create context
const CryptoContext = createContext();

// Custom hook to use the crypto context
export const useCryptoContext = () => useContext(CryptoContext);

// CryptoProvider component
export const CryptoProvider = ({ children }) => {
  // State for storing coin data
  const [coins, setCoins] = useState([]);
  const [topCoins, setTopCoins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [favorites, setFavorites] = useState(() => {
    // Initialize favorites from localStorage if available
    const storedFavorites = localStorage.getItem('cryptoFavorites');
    return storedFavorites ? JSON.parse(storedFavorites) : [];
  });
  const [searchTerm, setSearchTerm] = useState('');

  // Fetch coin data
  useEffect(() => {
    const fetchCoins = async () => {
      try {
        setLoading(true);
        // Fetch top 100 coins by market cap
        const response = await axios.get(
          'https://api.coingecko.com/api/v3/coins/markets', 
          {
            params: {
              vs_currency: 'usd',
              order: 'market_cap_desc',
              per_page: 100,
              page: 1,
              sparkline: false,
              price_change_percentage: '24h'
            }
          }
        );
        
        setCoins(response.data);
        // Set top 10 coins for market share chart
        setTopCoins(response.data.slice(0, 10));
        setLoading(false);
      } catch (error) {
        console.error('Error fetching crypto data:', error);
        setError('Failed to fetch cryptocurrency data. Please try again later.');
        setLoading(false);
      }
    };

    fetchCoins();
    
    // Fetch data every 60 seconds to keep it updated
    const interval = setInterval(fetchCoins, 60000);
    
    // Cleanup interval on component unmount
    return () => clearInterval(interval);
  }, []);

  // Update localStorage when favorites change
  useEffect(() => {
    localStorage.setItem('cryptoFavorites', JSON.stringify(favorites));
  }, [favorites]);

  // Toggle favorite status
  const toggleFavorite = (coinId) => {
    setFavorites(prevFavorites => {
      if (prevFavorites.includes(coinId)) {
        return prevFavorites.filter(id => id !== coinId);
      } else {
        return [...prevFavorites, coinId];
      }
    });
  };

  // Check if a coin is favorited
  const isFavorite = (coinId) => {
    return favorites.includes(coinId);
  };

  // Filter coins based on search term
  const filteredCoins = coins.filter(coin => 
    coin.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    coin.symbol.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Get favorite coins
  const favoriteCoins = coins.filter(coin => favorites.includes(coin.id));

  return (
    <CryptoContext.Provider 
      value={{ 
        coins,
        topCoins,
        loading, 
        error,
        searchTerm,
        setSearchTerm,
        filteredCoins,
        favorites,
        favoriteCoins,
        toggleFavorite,
        isFavorite 
      }}
    >
      {children}
    </CryptoContext.Provider>
  );
};

export default CryptoContext; 