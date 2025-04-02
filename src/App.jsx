import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProviderWrapper } from './context/ThemeContext';
import { CryptoProvider } from './context/CryptoContext';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import CryptoDashboard from './pages/CryptoDashboard';
import CoinDetailsPage from './pages/CoinDetailsPage';
import InvestmentPage from './components/investments/InvestmentPage';
import ExpensesPage from './components/pages/ExpensesPage';
import CardsPage from './components/pages/CardsPage';
import WalletPage from './components/pages/WalletPage';
import SettingsPage from './components/pages/SettingsPage';

// Placeholder pages for other routes
const Cards = () => <div style={{ padding: 20 }}>Cards Page (Coming Soon)</div>;
const Wallet = () => <div style={{ padding: 20 }}>Wallet Page (Coming Soon)</div>;
const Settings = () => <div style={{ padding: 20 }}>Settings Page (Coming Soon)</div>;

function App() {
  return (
    <ThemeProviderWrapper>
      <CryptoProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<CryptoDashboard />} />
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="coin/:coinId" element={<CoinDetailsPage />} />
              <Route path="investments" element={<InvestmentPage />} />
              <Route path="expenses" element={<ExpensesPage />} />
              <Route path="cards" element={<CardsPage />} />
              <Route path="wallet" element={<WalletPage />} />
              <Route path="settings" element={<SettingsPage />} />
            </Route>
          </Routes>
        </Router>
      </CryptoProvider>
    </ThemeProviderWrapper>
  );
}

export default App;
