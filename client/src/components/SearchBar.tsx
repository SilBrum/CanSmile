import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SearchBar: React.FC = () => {
  const [selectedTreatment, setSelectedTreatment] = useState('');
  const [selectedDestination, setSelectedDestination] = useState('');
  const navigate = useNavigate();

  const treatments = [
    'Dental Implant',
    'Teeth Whitening',
    'Veneers',
    'Root Canal',
    'Braces',
    'Crowns',
    'Fillings',
  ];

  const destinations = [
    'Cancun, Mexico',
    'Rio de Janeiro, Brazil',
    'San Jose, Costa Rica',
    'Bangkok, Thailand',
    'Toronto, Canada',
    'Punta Cana, Dominican Republic',
    'Budapest, Hungary',
    'Mumbai, India',
    'Istanbul, Turkey',
    'Havana, Cuba',
  ];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();

    // Build query string
    const queryParams = new URLSearchParams();
    if (selectedTreatment) queryParams.append('treatment', selectedTreatment);
    if (selectedDestination) queryParams.append('destination', selectedDestination);

    // Navigate to search results
    navigate(`/search/listing?${queryParams.toString()}`);
  };

  return (
    <form onSubmit={handleSearch} className="flex items-center bg-white shadow-md rounded-full p-4">
      {/* Treatment Dropdown */}
      <select
        value={selectedTreatment}
        onChange={(e) => setSelectedTreatment(e.target.value)}
        className="border border-gray-300 rounded-l-full p-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-red-500"
      >
        <option value="">Select a treatment</option>
        {treatments.map((treatment, index) => (
          <option key={index} value={treatment}>
            {treatment}
          </option>
        ))}
      </select>

      {/* Destination Dropdown */}
      <select
        value={selectedDestination}
        onChange={(e) => setSelectedDestination(e.target.value)}
        className="border border-gray-300 rounded-r-full p-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-red-500"
      >
        <option value="">Select a destination</option>
        {destinations.map((destination, index) => (
          <option key={index} value={destination}>
            {destination}
          </option>
        ))}
      </select>

      {/* Search Button */}
      <button
        type="submit"
        className="bg-red-600 text-white p-2 hover:bg-red-800 rounded-full ml-2"
      >
        Search
      </button>
    </form>
  );
};

export default SearchBar;
