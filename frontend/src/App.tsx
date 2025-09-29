import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/Home/HomePage';
import SignupPage from './pages/SignupPage/SignupPage';
import AccountPage from './pages/AccountPage/AccountPage';
import LoginPage from './pages/LoginPage/LoginPage';
import ProtectedRoute from './components/ProtectedRoute';
import CompareBanksPage from './pages/CompareBanks/CompareBanks';
import InvestPage from './pages/InvestPage/InvestPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/create-account" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/compare-banks" element={<CompareBanksPage />} />
        <Route path="/invest" element={<InvestPage />} />
        <Route
          path="/account"
          element={
            <ProtectedRoute>
              <AccountPage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
