import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import ProductCard from '../components/ProductCard';

const CategoryPage = () => {
  const { type } = useParams(); // This will be 'shoes' or 'clothes'
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategoryProducts = async () => {
      setLoading(true);
      try {
    const url = type 
  ? `${import.meta.env.VITE_API_URL}/api/products?category=${type}`
  : `${import.meta.env.VITE_API_URL}/api/products`;

const response = await axios.get(url);
      } catch (error) {
        console.error("Error fetching category products", error);
      }
      setLoading(false);
    };

    fetchCategoryProducts();
  }, [type]); // Re-run when the URL changes (e.g., switching from shoes to clothes)

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-3xl font-bold capitalize mb-8 border-l-4 border-black pl-4">
        {type} Collection
      </h2>

      {loading ? (
        <div className="text-center py-20">Loading {type}...</div>
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