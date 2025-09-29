import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from '../pages/Home/HomePage';
import Dashboard from '../pages/Dashboard/Dashboard';
import SignupPage from '../pages/SignupPage/SignupPage';
import InvestPage from '../pages/InvestPage/InvestPage';
import CompareBanks from '../pages/CompareBanks/CompareBanks';

export function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/create-account" element={<SignupPage />} />
        <Route path="/compare-banks" element={<CompareBanks />} />
        <Route path="*" element={<h1>Página não encontrada</h1>} />
        <Route path="/invest" element={<InvestPage />} />
      </Routes>
    </Router>
  );
}
