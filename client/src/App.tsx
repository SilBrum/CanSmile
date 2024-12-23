import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import ClinicDetails from './pages/ClinicDetails';
import HowItWorks from './pages/HowItWorks';
import FAQ from './pages/FAQ';
import SearchResults from './pages/searchResults';
import Profile from './pages/Profile';
import Favorites from './pages/Favorites';
import Appointments from './pages/Appointments';

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
      <Route path="/search/listing" element={<SearchResults />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/favorites" element={<Favorites />} />
      <Route path="/appointments" element={<Appointments />} />
    </Routes>
  </Router>
);

export default App;
