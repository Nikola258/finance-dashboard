# Finance Dashboard

A modern cryptocurrency dashboard built with React, Material UI, and Recharts. This application allows users to track cryptocurrency prices, view historical data, and manage favorite coins.

## Features

- **Live Price Data**: Real-time pricing information for cryptocurrencies via the CoinGecko API
- **Market Share Visualization**: Pie chart showing market share of top 10 cryptocurrencies
- **Price History Charts**: Interactive area charts showing price trends with multiple timeframe options
- **Cryptocurrency List**: Paginated and sortable table of top 100 cryptocurrencies
- **Search Functionality**: Filter cryptocurrencies by name or symbol
- **Favorites**: Mark cryptocurrencies as favorites for quick access
- **Detailed Coin Pages**: View comprehensive information about each cryptocurrency
- **Responsive Design**: Fully responsive layout that works on desktop and mobile devices
- **Dark/Light Mode**: Toggle between dark and light themes

## Technologies Used

- **React**: UI library for building the user interface
- **React Router**: For navigation and routing
- **Material UI**: Component library for consistent design
- **Recharts**: Library for creating responsive charts
- **Axios**: For making API requests
- **CoinGecko API**: Data source for cryptocurrency information

## Installation

1. Clone the repository:
   ```
   git clone <repository-url>
   ```

2. Navigate to the project directory:
   ```
   cd finance-dashboard-fe/vite-project
   ```

3. Install dependencies:
   ```
   npm install
   ```

4. Start the development server:
   ```
   npm run dev
   ```

5. Open your browser and navigate to:
   ```
   http://localhost:5173
   ```

## Build for Production

To build the application for production:

```
npm run build
```

The build files will be located in the `dist` directory.

## Project Structure

- `src/components/`: React components
  - `crypto/`: Cryptocurrency-specific components
  - `charts/`: Chart components
  - `dashboard/`: Dashboard components
  - `sidebar/`: Navigation components
- `src/context/`: Context providers for state management
- `src/pages/`: Page components
- `src/utils/`: Utility functions and data
- `public/images/`: Static images

## Future Enhancements

- Portfolio tracking functionality
- Price alerts
- Additional chart types
- Trading view integration
- Custom watchlists

## License

This project is licensed under the MIT License - see the LICENSE file for details.
