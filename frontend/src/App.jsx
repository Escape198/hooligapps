import { Routes, Route, Link } from 'react-router-dom';
import HomePage from './HomePage';
import SubmitPage from './SubmitPage';
import HistoryPage from './HistoryPage';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/submit" element={<SubmitPage />} />
      <Route path="/history" element={<HistoryPage />} />
    </Routes>
  );
}
