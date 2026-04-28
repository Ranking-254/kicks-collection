import React, { useState } from 'react';

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto my-6 px-4">
      <div className="relative">
        <input
          type="text"
          placeholder="Search for kicks or outfits..."
          className="w-full p-4 pl-10 text-sm border border-gray-300 rounded-full bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button
          type="submit"
          className="text-white absolute right-2.5 bottom-2.5 bg-black hover:bg-gray-800 focus:ring-4 font-medium rounded-full text-sm px-4 py-2"
        >
          Search
        </button>
      </div>
    </form>
  );
};

export default SearchBar;