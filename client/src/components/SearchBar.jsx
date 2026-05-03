import React, { useState, useEffect } from 'react';

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  useEffect(() => {
    // Only trigger if there is a query or if the user cleared the bar
    const delayDebounceFn = setTimeout(() => {
      onSearch(query);
    }, 300);

    return () => clearTimeout(delayDebounceFn);
    // 🛠️ FIX: We only depend on 'query'. 
    // Removing 'onSearch' stops the infinite refresh loop.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]); 

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto my-10 px-4 group">
      <div className="relative">
        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-black transition-colors">
          🔍
        </span>

        <input
          type="text"
          placeholder="Search for kicks, wigs or accessories..."
          className="w-full p-5 pl-12 text-xs font-bold uppercase tracking-widest border-2 border-gray-100 rounded-2xl bg-white shadow-sm outline-none focus:border-yellow-400 focus:shadow-xl transition-all"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />

        <button
          type="submit"
          className="absolute right-3 top-1/2 -translate-y-1/2 bg-black text-white px-5 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-yellow-400 hover:text-black transition-all active:scale-95"
        >
          GO
        </button>
      </div>
      
      {query && (
        <p className="text-[9px] font-black uppercase text-gray-400 mt-3 ml-4 animate-pulse">
          Searching for: <span className="text-black italic">{query}</span>
        </p>
      )}
    </form>
  );
};

export default SearchBar;