import React, { useState } from 'react';

interface SearchBarProps {
  onSearch: (type: string, query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [searchType, setSearchType] = useState('Treatment');
  const [query, setQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(searchType, query);
    }
  };

  return (
    <form onSubmit={handleSearch} className="flex items-center bg-white shadow-md rounded p-4">
      {/* Dropdown */}
      <select
        value={searchType}
        onChange={(e) => setSearchType(e.target.value)}
        className="border border-gray-300 rounded-l-md p-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="Treatment">Treatment</option>
        <option value="Destination">Destination</option>
      </select>

      {/* Input Field */}
      <input
        type="text"
        placeholder={`Search by ${searchType.toLowerCase()}...`}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="flex-grow border-t border-b border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      {/* Search Button */}
      <button
        type="submit"
        className="bg-blue-500 text-white p-2 rounded-r-md hover:bg-blue-600"
      >
        Search
      </button>
    </form>
  );
};

export default SearchBar;
