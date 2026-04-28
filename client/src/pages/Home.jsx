import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Hero from '../components/Hero';
import SearchBar from '../components/SearchBar';
import ProductCard from '../components/ProductCard';

// This pulls the URL from Vercel/Local .env
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchProducts = async (searchQuery = '') => {
    setLoading(true);
    try {
      // Updated the template literal to use API_URL
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
          <h3 className="text-center text-xl font-bold mb-4 uppercase tracking-widest">Find your style</h3>
          <SearchBar onSearch={fetchProducts} />
        </div>

        <h2 className="text-2xl font-black mb-6 uppercase">Full Collection</h2>
        {loading ? (
          <div className="flex justify-center items-center h-40">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-black"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {products.length > 0 ? (
              products.map(product => (
                <ProductCard key={product._id} product={product} />
              ))
            ) : (
              <p className="text-gray-500 text-center col-span-full">No items found. Try a different search!</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;