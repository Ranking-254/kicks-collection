import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import ProductCard from '../components/ProductCard';

// 1. Define the base API URL
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const CategoryPage = () => {
  const { type } = useParams(); 
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategoryProducts = async () => {
      setLoading(true);
      try {
        // 2. Build the URL based on the category type
        const url = type 
          ? `${API_URL}/api/products?category=${type}`
          : `${API_URL}/api/products`;

        const response = await axios.get(url);
        
        // 3. CRITICAL: Save the data to your state!
        setProducts(response.data); 
        
      } catch (error) {
        console.error("Error fetching category products", error);
      }
      setLoading(false);
    };

    fetchCategoryProducts();
  }, [type]); 

  return (
    <div className="container mx-auto p-6 min-h-screen">
      <h2 className="text-3xl font-bold capitalize mb-8 border-l-4 border-black pl-4">
        {type} Collection
      </h2>

      {loading ? (
        <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-black"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.length > 0 ? (
            products.map(product => (
              <ProductCard key={product._id} product={product} />
            ))
          ) : (
            <p className="text-gray-500">No items found in this category yet.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default CategoryPage;