import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import AuthPage from './pages/AuthPage';
import UrlGeneratorPage from './pages/UrlGeneratorPage';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/generate" element={<UrlGeneratorPage />} />
      </Routes>
    </Router>
  );
};

export default App;
