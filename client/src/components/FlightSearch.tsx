import React, { useState } from 'react';
import axios from 'axios';

interface FlightSearchProps {
  destination: string;
  onFlightSelect: (price: number) => void;
}

const FlightSearch: React.FC<FlightSearchProps> = ({ destination, onFlightSelect }) => {
  const [origin, setOrigin] = useState('');
  const [departureDate, setDepartureDate] = useState('');
  const [flights, setFlights] = useState<any[]>([]);
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 5;

  const fetchFlights = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/flights/search`, {
        params: { origin, destination, departureDate },
      });
      setFlights(response.data);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching flights:', err);
      setLoading(false);
    }
  };

  const fetchSuggestions = async (query: string) => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/flights/autocomplete`, {
        params: { query },
      });
      setSuggestions(response.data);
    } catch (err) {
      console.error('Error fetching autocomplete suggestions:', err);
    }
  };

  const handleOriginChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setOrigin(value);
    if (value.length > 2) {
      fetchSuggestions(value);
    } else {
      setSuggestions([]);
    }
  };

  const handleSuggestionClick = (code: string) => {
    setOrigin(code);
    setSuggestions([]);
  };

  const totalPages = Math.ceil(flights.length / rowsPerPage);
  const currentFlights = flights.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  return (
    <div className="flight-search mb-8">
      <div className="flex items-center space-x-4">
      <input
        type="text"
        placeholder="Departure Location (e.g., YVR)"
        value={origin}
        onChange={handleOriginChange}
        className="w-1/3 p-2 rounded-all border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
      />
      <ul className="suggestions-list">
        {suggestions.map((suggestion, index) => (
          <li key={index} onClick={() => handleSuggestionClick(suggestion.code)}>
            {suggestion.name} ({suggestion.code})
          </li>
        ))}
      </ul>

      <input
        type="date"
        value={departureDate}
        onChange={(e) => setDepartureDate(e.target.value)}
        className="p-2 rounded-full border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
      />
      <button
        onClick={fetchFlights}
        className="text-white bg-red-700 hover:bg-red-900 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
      >
        Search Flights
      </button>
      </div>

      {loading && <p>Loading flights...</p>}

      {flights.length > 0 && (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th className="px-6 py-3">Price</th>
                <th className="px-6 py-3">Currency</th>
                <th className="px-6 py-3">Departure</th>
                <th className="px-6 py-3">Arrival</th>
                <th className="px-6 py-3">Duration</th>
                <th className="px-6 py-3">Carrier</th>
                <th className="px-6 py-3">Action</th>
              </tr>
            </thead>
            <tbody>
              {currentFlights.map((flight, index) => (
                <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                  <td className="px-6 py-4">{flight.price}</td>
                  <td className="px-6 py-4">{flight.currency}</td>
                  <td className="px-6 py-4">
                    {flight.departure.iataCode} at{' '}
                    {new Date(flight.departure.at).toLocaleString()}
                  </td>
                  <td className="px-6 py-4">
                    {flight.arrival.iataCode} at{' '}
                    {new Date(flight.arrival.at).toLocaleString()}
                  </td>
                  <td className="px-6 py-4">{flight.duration}</td>
                  <td className="px-6 py-4">{flight.carrierCode}</td>
                  <td className="px-6 py-4">
                    <button
                      className="px-3 py-1 text-white bg-red-500 rounded-full hover:bg-red-700"
                      onClick={() => onFlightSelect(flight.price)}
                    >
                      Select Flight
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="flex justify-between items-center mt-4">
            <button
              className="px-4 py-2 ml-5 mb-2 text-white bg-gray-400 rounded-full hover:bg-gray-700 disabled:opacity-50"
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
            >
              Previous
            </button>
            <p>
              Page {currentPage} of {totalPages}
            </p>
            <button
              className="px-4 py-2 mr-5 mb-2 text-white bg-gray-400 rounded-full hover:bg-gray-700 disabled:opacity-50"
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        </div>
      )}

      {flights.length === 0 && !loading && <p>No flights found. Please try a different search.</p>}
    </div>
  );
};

export default FlightSearch;
