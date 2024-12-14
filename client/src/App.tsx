import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import ClinicDetails from './pages/ClinicDetails';
import HowItWorks from './pages/HowItWorks';
import FAQ from './pages/FAQ';

const App: React.FC = () => (
  <Router>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/clinic/:id" element={<ClinicDetails />} />
      <Route path="/" element={<Home />} />
      <Route path="/HowItWorks" element={<HowItWorks />} />
      <Route path="/faq" element={<FAQ />} />
    </Routes>
  </Router>
);

export default App;
