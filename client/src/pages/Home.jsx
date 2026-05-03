import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Hero from '../components/Hero';
import SearchBar from '../components/SearchBar';
import ProductCard from '../components/ProductCard';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentQuery, setCurrentQuery] = useState(''); // Track query for the "No results" text

  const fetchProducts = async (searchQuery = '') => {
    setLoading(true);
    setCurrentQuery(searchQuery);
    try {
      const response = await axios.get(`${API_URL}/api/products?search=${searchQuery}`);
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="pb-20">
      <Hero />

      <div className="container mx-auto px-4">
        <div className="mb-12">
          <h3 className="text-center text-[10px] font-black uppercase tracking-[0.3em] text-gray-400 mb-4">
            Find your style
          </h3>
          <SearchBar onSearch={fetchProducts} />
        </div>

        <h2 className="text-3xl font-black mb-10 uppercase italic tracking-tighter border-l-8 border-yellow-400 pl-4">
          Full Collection
        </h2>

        {loading ? (
          <div className="flex flex-col justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-black mb-4"></div>
            <p className="text-[10px] font-black uppercase tracking-widest animate-pulse">Syncing Inventory...</p>
          </div>
        ) : (
          <div>
            {products.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {products.map(product => (
                  <ProductCard key={product._id} product={product} />
                ))}
              </div>
            ) : (
              /* ⚡ ENHANCED NO RESULTS STATE ⚡ */
              <div className="text-center py-20 flex flex-col items-center bg-gray-50 rounded-[3rem] border-2 border-dashed border-gray-200">
                <p className="text-6xl mb-6">👟</p>
                <h3 className="font-black uppercase italic text-gray-400 text-2xl tracking-tighter">
                  No drops found for "{currentQuery}"
                </h3>
                <p className="text-gray-300 text-xs font-bold uppercase mt-2 tracking-widest">
                  Try checking your spelling or use general terms
                </p>
                <button 
                  onClick={() => fetchProducts('')} 
                  className="mt-8 bg-black text-white px-10 py-4 rounded-2xl font-black uppercase text-[10px] tracking-widest hover:bg-yellow-400 hover:text-black transition-all shadow-xl active:scale-95"
                >
                  View All Kicks
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;